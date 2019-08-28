import { IMiddleware, Middleware, Next, Request, Response } from "@tsed/common";
import * as Express from "express";
import jwt from "express-jwt";
import { Config } from "../Config";

@Middleware()
export default class JWTMiddleWare implements IMiddleware {
    private static REQUEST_HANDLER: Express.RequestHandler = jwt(
        {
            secret: Buffer.from(Config().SECRET, "base64"),
        });
    public use(
        @Request() req: Express.Request,
        @Response() res: Express.Response,
        @Next() next: Express.NextFunction) {
        JWTMiddleWare.REQUEST_HANDLER(req, res, next);
    }
}
