import bodyParser from "body-parser";
import cors from "cors";
import {Express, NextFunction, Request, Response} from "express";
import express from "express";
import jwt from "express-jwt";
import httpStatus from "http-status-codes";
import {environment, port, secret} from "./config.json";
import logger from "./src/Logger";
import {UserInfoDB} from "./src/UserInfoDB";

/* set to 'development' for stacktrace on api error */
process.env.NODE_ENV = environment;

const api: Express = express();
api.use(bodyParser.json());
api.use(cors({
    /* same cors configuration as ../docker/grpc-proxy/envoy.yaml */
    allowedHeaders: ["host", "keep-alive", "user-agent", "cache-control", "content-type", "content-transfer-encoding",
        "x-accept-content-transfer-encoding", "x-accept-response-streaming", "x-user-agent",
        "x-grpc-web", "grpc-timeout", "authorization"],
    exposedHeaders: ["grpc-status", "grpc-message"],
    methods: ["GET", "PUT", "DELETE", "POST", "OPTIONS"],
    optionsSuccessStatus: httpStatus.OK,
    origin: "*",
}));

/* setup authenticated/ignored routes */
api.use(jwt({
    secret: Buffer.from(secret, "base64"),
}).unless({
    path: [
        {
            methods: ["POST"],
            url: "/login",
        },
        {
            methods: ["PUT"],
            url: "/user",
        },
        {
            /* grpc-proxy sends an unauthorized OPTIONS request to retrieve metadata before the POST query */
            methods: ["OPTIONS"],
            url: /\/rpcpb.MetricService\/.*/,
        },
    ],
}));

/* POST /login endpoint returns a JWT token on request */
api.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    let username;
    try {
        username = req.body.username;
        const {password} = req.body;
        const jwtToken = await UserInfoDB.getInstance().login(username, password);
        res.status(httpStatus.OK).json({tkn: jwtToken});
        logger.debug("logged in user", {username, tkn: jwtToken});
    } catch (e) {
        res.status(httpStatus.BAD_REQUEST).end();
        logger.error((e as Error).message, {username});
    } finally {
        next();
    }
});

/* PUT /user endpoint creates a new user or errors if the user already exists */
api.put("/user", async (req: Request, res: Response, next: NextFunction) => {
    let username;
    try {
        username = req.body.username;
        const {password} = req.body;
        const ok = await UserInfoDB.getInstance().addUser(username, password);
        const response = {success: ok};
        res.status(httpStatus.OK).json(response);
        logger.info("added new user", {success: ok, username, password});
    } catch (e) {
        res.status(httpStatus.BAD_REQUEST).end();
        logger.error((e as Error).message, {username});
    } finally {
        next();
    }
});

/* relay grpc-web requests after JWT authentication */
api.all(/\/rpcpb.MetricService\/.*/, (_: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.OK).end();
    next();
});

/* main */
(async () => {
    await UserInfoDB.getInstance().init();
    api.listen(port, (err: any) => {
        if (err) {
            logger.error(err);
        }
        logger.info("start api service...");
    });
})();
