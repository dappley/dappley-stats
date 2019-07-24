import {UserInfoDB} from "../src/UserInfoDB";

describe("SqliteUserInfoDB Test Suite", () => {
    const db = new UserInfoDB(":memory:");
    beforeAll(async () => {
        try {
            expect(await db.init()).toBeNull();
        } catch (e) {
            fail(e);
        }
    });

    test("Should be able to create a user", async () => {
        try {
            expect(await db.addUser("user-0", "password")).toBe(true);
        } catch (e) {
            fail(e);
        }
    });

    test("Should not add a duplicate user", async () => {
        try {
            expect(await db.addUser("user-1", "password")).toBe(true);
            fail(await db.addUser("user-1", "password"));
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });

    test("Should be able to login", async () => {
        try {
            expect(await db.addUser("user-2", "password")).toBe(true);
            const tkn = await db.login("user-2", "password");
            expect(tkn).not.toBeInstanceOf(Error);
        } catch (e) {
            fail(e);
        }
    });

    test("Should reject invalid username", async () => {
        try {
            await db.login("invalid-user", "password");
            fail("Invalid username was accepted by database");
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });

    test("Should reject invalid password", async () => {
        try {
            expect(await db.addUser("user-3", "password")).toBe(true);
            await db.login("user-3", "wrong-password");
            fail("Invalid username & password combination was accepted");
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });

    test("Should not be able to delete non existing user", async () => {
        try {
            expect(await db.deleteUser("non-existing-user")).toBe(false);
        } catch (e) {
            fail("Deleting non existing user threw an unexpected error");
        }
    });

    test("Should be able to delete a user", async () => {
        try {
            expect(await db.addUser("user-4", "password")).toBe(true);
            expect(await db.deleteUser("user-4")).toBe(true);
        } catch (e) {
            fail("Unable to delete added user");
        }
    });

    test("Should not be able login to uninitialized database", async () => {
       try {
           const newDb = new UserInfoDB(":memory:");
           await newDb.login("user-0", "password");
           fail("Should not be able to login to uninitialized database");
       } catch (e) {
           expect(e).toBe(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
       }
    });

    test("Should reject invalid login arguments", async () => {
       try {
           await db.login("", "");
           fail("Should not be able to login with invalid arguments");
       } catch (e) {
           expect(e).toBe(UserInfoDB.INVALID_ARGUMENTS_ERROR);
       }
    });

    test("Should not be able add a user to uninitialized database", async () => {
        try {
            const newDb = new UserInfoDB(":memory:");
            await newDb.addUser("username", "password");
            fail("Should not be able to add a user to uninitialized database");
        } catch (e) {
            expect(e).toBe(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
        }
    });

    test("Should reject invalid addUser arguments", async () => {
        try {
            await db.addUser("", "");
            fail("Should not be able to add a user with invalid arguments");
        } catch (e) {
            expect(e).toBe(UserInfoDB.INVALID_ARGUMENTS_ERROR);
        }
    });

    test("Should not be able delete a user with an uninitialized database", async () => {
        try {
            const newDb = new UserInfoDB(":memory:");
            await newDb.deleteUser("username");
            fail("Should not be able delete a user with an uninitialized database");
        } catch (e) {
            expect(e).toBe(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
        }
    });

    test("Should reject invalid deleteUser arguments", async () => {
        try {
            await db.deleteUser("");
            fail("Should reject invalid deleteUser arguments");
        } catch (e) {
            expect(e).toBe(UserInfoDB.INVALID_ARGUMENTS_ERROR);
        }
    });
});
