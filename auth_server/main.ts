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
api.use(cors());

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
            methods: ["DELETE"],
            url: /\/user\/[^\/]/,
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
        res.status(httpStatus.OK).json({success: ok});
        logger.info("added new user", {success: ok, username});
    } catch (e) {
        res.status(httpStatus.BAD_REQUEST).end();
        logger.error((e as Error).message, {username});
    } finally {
        next();
    }
});

/* DELETE /user endpoint attempts to remove a user */
api.delete("/user/:username", async (req: Request, res: Response, next: NextFunction) => {
    let username;
    try {
        username = req.params.username;
        const ok = await UserInfoDB.getInstance().deleteUser(username);
        res.status(httpStatus.OK).json({success: ok});
        if (ok) {
            logger.info("deleted user", {username});
        } else {
            logger.info("attempted to delete non existing user", {username});
        }
    } catch (e) {
        res.status(httpStatus.BAD_REQUEST).end();
        logger.error((e as Error).message, {username});
    } finally {
        next();
    }
});

/* relay grpc-web POST requests after JWT authentication */
api.post(/\/rpcpb.MetricService\/.*/, (_: Request, res: Response, next: NextFunction) => {
    res.setHeader("Connection", "close");
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
