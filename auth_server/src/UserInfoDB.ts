import bcrypt from "bcrypt";
import fs from "fs";
import fse from "fs-extra";
import path from "path";
import SQLite, {Database, RunResult, Statement} from "sqlite3";
import util from "util";
import {Config} from "./Config";
import JWTToken, {Token, TokenResponse} from "./JWTToken";
import logger from "./Logger";

const readFile = util.promisify(fs.readFile);

export class UserInfoDB {
    public static UNINITIALIZED_DATABASE_ERROR = new Error("database not initialized");
    public static INVALID_ARGUMENTS_ERROR = new Error("at least one of the supplied arguments are invalid");
    private static DB_PATH: string = path.join(__dirname, "..", "db", "user_info.sqlite");
    private static INIT_DATABASE_SCRIPT: string = path.join(
        __dirname, "..", "resources", "init_user_info_database.sql");
    private static SALT_OR_ROUNDS: string | number = 10;
    private static instance?: UserInfoDB;
    private db?: Database;
    private readonly databasePath: string;

    /**
     * @returns the global instance of UserInfoDB
     */
    public static getInstance(): UserInfoDB {
        if (!this.instance) {
            this.instance = new UserInfoDB(UserInfoDB.DB_PATH);
        }
        return this.instance;
    }

    /**
     * Only public for testing
     * @param databasePath specifies the path to the database
     */
    constructor(databasePath: string) {
        this.databasePath = databasePath;
    }

    /**
     * @returns Empty promise on successful initialization, otherwise rejects with an Error
     */
    public init(): Promise<void> {
        return new Promise(async (resolve: any, reject: any) => {
            await fse.ensureDir(path.dirname(this.databasePath));
            this.db = new SQLite.Database(this.databasePath || UserInfoDB.DB_PATH,
                SQLite.OPEN_CREATE | SQLite.OPEN_READWRITE, async (err: Error | null) => {
                    if (err || !this.db) {
                        logger.error(err!);
                        reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
                        return;
                    }

                    /* create the user info table if it doesn't exist */
                    const db: Database = this.db!;
                    try {
                        const file = await readFile(UserInfoDB.INIT_DATABASE_SCRIPT, "utf-8");
                        db!.exec(file, async function(this: Statement, e: Error | null) {
                            if (e) {
                                logger.error(e!);
                                reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
                                return;
                            }
                            resolve();
                        });
                    } catch (err) {
                        logger.error(err);
                        reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
                    }
                });
        });
    }

    /**
     *
     * @returns Empty promise on successful insertion/replacement of the default user, otherwise rejects with an Error
     */
    public createDefaultUser(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
                return;
            }
            this.db!.run("REPLACE INTO user_info VALUES (?, ?)",
                [Config().DEFAULT_USERNAME, UserInfoDB.hashPassword(Config().DEFAULT_PASSWORD)],
                function(this: RunResult, err: Error) {
                    if (err) {
                        logger.error("unable to create default user",
                            {username: Config().DEFAULT_USERNAME, err});
                        reject(new Error("unable to create default user"));
                        return;
                    }
                    resolve();
                });
        });
    }

    /**
     *
     * @param password
     * @returns hashed password for insertion into user info database
     */
    private static hashPassword(password: string): string {
        return bcrypt.hashSync(password, UserInfoDB.SALT_OR_ROUNDS);
    }

    /**
     *
     * @param username
     * @param password
     * @returns Promise of a boolean representing whether the user was successfully
     *          added to database, otherwise rejects with an Error
     */
    public addUser(username: string, password: string): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => {
            if (username && password) {
                if (!this.db) {
                    reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
                    return;
                }
                const hash = UserInfoDB.hashPassword(password);
                this.db!.run("INSERT INTO user_info VALUES (?, ?)", [username, hash],
                    function(this: RunResult, err: Error | null) {
                        if (err) {
                            logger.error(err);
                            reject(new Error("unable to add user"));
                            return;
                        }

                        resolve(!!this.lastID);
                    });
            } else {
                reject(UserInfoDB.INVALID_ARGUMENTS_ERROR);
            }
        });
    }

    /**
     *
     * @param username
     * @returns Promise of a boolean representing whether the user was deleted
     *          from the database, otherwise rejects with an Error
     */
    public deleteUser(username: string): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => {
           if (username) {
               if (!this.db) {
                   reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
                   return;
               }

               this.db!.run("DELETE FROM user_info WHERE username = ?", [username],
                   function(this: RunResult, err: Error | null) {
                       if (err) {
                           reject(new Error("unable to delete user"));
                           return;
                       }
                       resolve(this.changes > 0);
                   });
           } else {
               reject(UserInfoDB.INVALID_ARGUMENTS_ERROR);
           }
        });
    }

    /**
     *
     * @param username
     * @param password
     * @returns Promise of a JWT if the user credentials are valid, otherwise rejects with an Error
     */
    public login(username: string, password: string): Promise<TokenResponse> {
        return new Promise((resolve: any, reject: any) => {
            if (username && password) {
                if (!this.db) {
                    reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
                    return;
                }

                this.db!.get("SELECT password FROM user_info WHERE username = ?", [username],
                    function(this: Statement, err: Error | null, row: { password: string }) {
                        if (err) {
                            logger.error(err);
                            reject(new Error("unable to login user"));
                            return;
                        }

                        if (row) {
                            if (bcrypt.compareSync(password, row.password)) {
                                resolve({
                                    accessTkn: JWTToken.newTkn({
                                        tokenType: Token.ACCESS, username,
                                    }, JWTToken.ACCESS_TOKEN_LIFESPAN),
                                    refreshTkn: JWTToken.newTkn({
                                        tokenType: Token.REFRESH, username,
                                    }, JWTToken.REFRESH_TOKEN_LIFESPAN),
                                });
                            } else {
                                reject(new Error("incorrect password"));
                            }
                        } else {
                            reject(new Error(`user '${username}' does not exist`));
                        }
                    });
            } else {
                reject(UserInfoDB.INVALID_ARGUMENTS_ERROR);
            }
        });
    }

    /**
     *
     * @param username
     * @returns a Promise of Void if the user exists otherwise rejects with an Error
     */
    public hasUser(username: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (username) {
                if (!this.db) {
                    reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
                    return;
                }
                this.db!.get("SELECT * FROM user_info WHERE username = ?", [username],
                    function(this: Statement, err: Error | null, row: any) {
                        if (err) {
                            logger.error(err);
                            reject(err);
                            return;
                        }
                        if (row) {
                            resolve();
                        } else {
                            reject(new Error(`user '${username}' does not exist`));
                        }
                    });
            } else {
                reject(UserInfoDB.INVALID_ARGUMENTS_ERROR);
            }
        });
    }
}
