import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";
import JWTToken, {Token, TokenResponse} from "../src/JWTToken";
import {UserInfoDB} from "../src/UserInfoDB";

describe("Token Test Suite", () => {
    const db = new UserInfoDB(":memory:");
    const testUsername = "test-user";
    const testPassword = "password";

    beforeAll(async () => {
        try {
            await db.init();
            expect(await db.addUser(testUsername, testPassword)).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    test("Should issue a new access token but not a refresh token", async (done) => {
        try {
            const tkn = JWTToken.newTkn(
                {username: testUsername, tokenType: Token.REFRESH},
                JWTToken.REFRESH_TOKEN_LIFESPAN);
            const res: TokenResponse = await JWTToken._refresh(tkn, db);
            expect(res.accessTkn.length).toBeGreaterThan(0);
            expect(res.refreshTkn.length).toBeGreaterThan(0);
            expect(tkn).toEqual(res.refreshTkn);

            /* wait 1 sec so a new iat header is generated for the jwt token  */
            setTimeout(async () => {
                try {
                    const retry: TokenResponse = await JWTToken._refresh(tkn, db);
                    expect(retry.accessTkn.length).toBeGreaterThan(0);
                    expect(retry.refreshTkn.length).toBeGreaterThan(0);

                    expect(res.accessTkn).not.toEqual(retry.accessTkn);
                    expect(tkn).toEqual(res.refreshTkn);
                    done();
                } catch (e) {
                    fail(e);
                }
            }, 1000);
        } catch (e) {
            fail(e);
        }
    });

    test("Should issue both a new access token and refresh token", async () => {
        try {
            /* generate new refresh token that is within the reissue time difference */
            const tkn = JWTToken.newTkn(
                {username: testUsername, tokenType: Token.REFRESH}, JWTToken.REISSUE_REFRESH_TOKEN_DIFF / 2);
            const res: TokenResponse = await JWTToken._refresh(tkn, db);
            expect(res.accessTkn.length).toBeGreaterThan(0);
            expect(res.refreshTkn.length).toBeGreaterThan(0);
            expect(res.refreshTkn).not.toEqual(tkn);
        } catch (e) {
            fail(e);
        }
    });

    test("Should not refresh an expired token", async (done) => {
        try {
            const tkn = JWTToken.newTkn({username: testUsername, tokenType: Token.REFRESH}, 1);
            setTimeout(async () => {
                try {
                    await JWTToken._refresh(tkn, db);
                    fail("An expired refresh token was accepted");
                } catch (e) {
                    expect(e).toBeInstanceOf(TokenExpiredError);
                    done();
                }
            }, 1000);
        } catch (e) {
            fail(e);
        }
    });

    test("Should not refresh a token not signed by the server", async () => {
        /* tkn signed with a different secret */
        const tkn = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtdXNlciIsInRva2VuVHlwZSI6MSwia" +
            "WF0IjoxNTY1ODE5NDA1LCJleHAiOjE1NjY0MjQyMDV9.A4F6uyLY3nBJL2tx7J7GVTc9Wcere3tqTmEZatkzFqY";
        try {
            await JWTToken._refresh(tkn, db);
            fail("Token signed by another server was accepted");
        } catch (e) {
            expect(e).toBeInstanceOf(JsonWebTokenError);
        }
    });

    test("Should not refresh token when payload user doesn't exist", async () => {
        try {
            const username = "not-a-user";
            const tkn = JWTToken.newTkn({username, tokenType: Token.REFRESH}, JWTToken.REFRESH_TOKEN_LIFESPAN);
            await JWTToken._refresh(tkn, db);
            fail("Refreshed token with invalid user in payload");
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });

    test("Should not be able to refresh an access token", async () => {
        try {
            const tkn = JWTToken.newTkn(
                {username: testUsername, tokenType: Token.ACCESS}, JWTToken.REFRESH_TOKEN_LIFESPAN);
            await JWTToken._refresh(tkn, db);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
});
