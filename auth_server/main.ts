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

/* relay grpc-web POST requests after JWT authentication */
api.post(/\/rpcpb.MetricService\/.*/, (_: Request, res: Response, next: NextFunction) => {
    res.setHeader("Connection", "close");
    res.status(httpStatus.OK).end();
    next();
});

/* main */
(async () => {
    const db = UserInfoDB.getInstance();
    await db.init();
    await db.createDefaultUser();
    api.listen(port, (err: any) => {
        if (err) {
            logger.error(err);
        }
        logger.info("start api service...");
    });
})();
