import {
    BodyParams, ContentType, Controller, Header, Post, QueryParams, Required,
    Status, UseAuth } from "@tsed/common";
import { AcceptMime } from "@tsed/common/lib/mvc/decorators/method/acceptMime";
import HttpStatus from "http-status-codes";
import { BadRequest } from "ts-httpexceptions";
import JWTToken, { TokenResponse } from "../JWTToken";
import logger from "../Logger";
import JWT from "../middleware/JWT";
import LoginRequest from "../models/LoginRequest";
import { UserInfoDB } from "../UserInfoDB";

@Controller("/")
export default class RootController {
    private static BAD_REQUEST = new BadRequest("");

    /**
     *
     * @param {LoginRequest} req
     * @returns {Promise<TokenResponse>} an access and a refresh JWT token on
     * successful login
     */
    @Post("/login")
    @AcceptMime("application/json")
    @Status(HttpStatus.OK)
    @ContentType("application/json")
    public async login(@Required() @BodyParams(LoginRequest) req: LoginRequest): Promise<TokenResponse> {
        try {
            return await UserInfoDB.getInstance().login(req.username, req.password);
        } catch (e) {
            logger.error((e as Error).message, {username: req.username});
            throw RootController.BAD_REQUEST;
        }
    }

    /**
     *
     * @param {string} tkn
     * @returns {Promise<TokenResponse>} an access and a refresh JWT token iff
     * the query parameter tkn is a valid refresh token supplied by this server;
     * the refresh token is updated only if it will expire soon as determined
     * by UserInfoDB.refresh
     */
    @Post("/refresh")
    @Status(HttpStatus.OK)
    @ContentType("application/json")
    public async refresh(@Required() @QueryParams("tkn") tkn: string): Promise<TokenResponse> {
        try {
            return await JWTToken.refresh(tkn);
        } catch (e) {
            logger.error("unable to perform refresh request", e);
            throw RootController.BAD_REQUEST;
        }
    }

    /**
     * relay grpc-web POST requests after JWT authentication
     */
    @Post(/\/rpcpb.MetricService\/.*/)
    @UseAuth(JWT)
    @Status(HttpStatus.OK)
    @Header("Connection", "close")
    // tslint:disable-next-line: no-empty
    public metricsServiceRelay(): void {}
}
