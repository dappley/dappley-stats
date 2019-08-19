import bodyParser from "body-parser";
import cors from "cors";
import {Express, NextFunction, Request, Response} from "express";
import express from "express";
import jwt from "express-jwt";
import httpStatus from "http-status-codes";
import {environment, port, secret} from "./config.json";
import JWTToken, {TokenResponse} from "./src/JWTToken";
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
            methods: ["POST"],
            url: "/refresh",
        },
    ],
}));

api.use(function(err: any, _req: Request, res: Response, next: NextFunction) {
    if (err instanceof jwt.UnauthorizedError) {
        logger.debug(err);
        res.status(httpStatus.UNAUTHORIZED).end();
    } else {
        next(err);
    }
});

/* POST /login endpoint returns an access and a refresh JWT token on successful login */
api.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    let username;
    try {
        username = req.body.username;
        const {password} = req.body;
        const tokens: TokenResponse = await UserInfoDB.getInstance().login(username, password);
        res.status(httpStatus.OK).json({tkn: tokens.accessTkn, refreshTkn: tokens.refreshTkn});
        logger.debug("logged in user", {username, tkn: tokens.accessTkn, refreshTkn: tokens.refreshTkn});
    } catch (e) {
        res.status(httpStatus.BAD_REQUEST).end();
        logger.error((e as Error).message, {username});
    } finally {
        next();
    }
});

/* POST /refresh endpoint returns an access and a refresh JWT token iff the query parameter tkn
   is a valid refresh token supplied by this server; the refresh token is updated only if it will expire soon as
   determined by UserInfoDB.refresh */
api.post("/refresh", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokens: TokenResponse = await JWTToken.refresh(req.query.tkn);
        res.status(httpStatus.OK).json({tkn: tokens.accessTkn, refreshTkn: tokens.refreshTkn});
    } catch (e) {
        res.status(httpStatus.BAD_REQUEST).end();
        logger.error("unable to perform refresh request", e);
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
