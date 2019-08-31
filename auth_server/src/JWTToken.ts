import jwt from "jsonwebtoken";
import { secret } from "../config.json";
import logger from "./Logger";
import { UserInfoDB } from "./UserInfoDB";

export type TokenResponse = {
    accessTkn: string;
    refreshTkn: string;
};

type DecodedPayload = JWTPayload & {
    /* https://tools.ietf.org/html/rfc7519#section-4 */
    /**
     * expiration date in seconds since Epoch
     */
    exp: number;

    /**
     * issued at date in seconds since Epoch
     */
    iat: number;
};

export enum Token {
    ACCESS,
    REFRESH,
}

type JWTPayload = {
    username: string;
    tokenType: Token;
};

export default class JWTToken {
    public static REFRESH_TOKEN_LIFESPAN = "7d";
    public static ACCESS_TOKEN_LIFESPAN = "15m";
    /**
     * If a token is within REISSUE_REFRESH_TOKEN_DIFF number of seconds
     * of it's expiration date, a new refresh token will be returned on
     * refresh request.
     */
    public static REISSUE_REFRESH_TOKEN_DIFF: number = 12 * 60 * 60;

    /**
     *
     * @static
     * @param payload the payload to be hashed into the JWT token
     * @param expiresIn
     * @returns returns a new jwt token with the specified payload and expiration date
     */
    public static newTkn(payload: JWTPayload, expiresIn: string | number): string {
        return jwt.sign(payload, Buffer.from(secret, "base64"), { expiresIn });
    }

    /**
     *
     * @static
     * @param {string} token is a string representation of the jwt token
     * @returns {Promise<TokenResponse>}
     */
    public static refresh(token: string): Promise<TokenResponse> {
        return JWTToken._refresh(token, UserInfoDB.getInstance());
    }

    /**
     * Public only for testing
     * @static
     * @param token is a string representation of the jwt token
     * @param database to search for the user embedded in the token's payload
     * @returns Promise of updated refresh and access tokens or Error on failure
     */
    public static _refresh(token: string, database: UserInfoDB): Promise<TokenResponse> {
        return new Promise<TokenResponse>((resolve: any, reject: any) => {
            jwt.verify(token, Buffer.from(secret, "base64"),
                { ignoreExpiration: false }, function(err: jwt.VerifyErrors, decodedPayload: object | string) {
                    if (err) {
                        /* verifies token was signed by this server and the token has not expired */
                        logger.error(err);
                        reject(err);
                    } else {
                        const payload = decodedPayload as DecodedPayload;
                        if (payload.tokenType !== Token.REFRESH) {
                            const e = new Error("invalid token");
                            logger.error(e);
                            reject(e);
                            return;
                        }
                        /* verify user exists */
                        database.hasUser(payload.username)
                            .then(() => {
                                logger.debug("Granted refresh token to user", payload);
                                /* a new refresh token is issued if it will expire
                                   sometime in the next REISSUE_REFRESH_TOKEN_DIFF
                                   seconds */
                                const now = Math.floor((new Date()).getTime() / 1000);
                                const reissueRefresh = payload.exp >= now &&
                                    payload.exp - now < JWTToken.REISSUE_REFRESH_TOKEN_DIFF;
                                resolve({
                                    accessTkn: JWTToken.newTkn({
                                        tokenType: Token.ACCESS, username: payload.username,
                                    }, JWTToken.ACCESS_TOKEN_LIFESPAN),
                                    refreshTkn: reissueRefresh ? JWTToken.newTkn({
                                        tokenType: Token.REFRESH, username: payload.username,
                                    }, JWTToken.REFRESH_TOKEN_LIFESPAN) : token,
                                });
                            })
                            .catch((e: Error) => {
                                logger.error(e);
                                reject(e);
                            });
                    }
                });
        });
    }
}
