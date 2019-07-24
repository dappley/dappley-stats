import bcrypt from "bcrypt";
import fs from "fs";
import fse from "fs-extra";
import jwt from "jsonwebtoken";
import path from "path";
import SQLite, {Database, RunResult, Statement} from "sqlite3";
import util from "util";
import {defaultPassword, defaultUsername, secret} from "../config.json";
import logger from "./Logger";

const readFile = util.promisify(fs.readFile);

export class UserInfoDB {
    private static UNINITIALIZED_DATABASE_ERROR = new Error("database not initialized");
    private static INVALID_ARGUMENTS_ERROR = new Error("at least one of the supplied arguments are invalid");
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
    public static getInstance() {
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
     * @returns Promise of null on successful initialization, otherwise an Error
     */
    public init(): Promise<null | Error> {
        return new Promise(async (resolve: any, reject: any) => {
            await fse.ensureDir(path.dirname(this.databasePath));
            this.db = new SQLite.Database(this.databasePath || UserInfoDB.DB_PATH,
                SQLite.OPEN_CREATE | SQLite.OPEN_READWRITE, async (err: Error | null) => {
                    if (err || !this.db) {
                        logger.error(err!);
                        reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
                    }

                    /* create the user info table if it doesn't exist */
                    const db: Database = this.db!;
                    try {
                        const file = await readFile(UserInfoDB.INIT_DATABASE_SCRIPT, "utf-8");
                        db!.exec(file, async function(this: Statement, e: Error | null) {
                            if (e) {
                                logger.error(e!);
                                reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
                            }
                            try {
                                await UserInfoDB.createDefaultUser(db);
                            } catch (e) {
                                reject(e);
                            }
                            resolve(null);
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
     * @param db Database to insert the default user into
     * @returns Promise of null on successful insertion/replacement of the default user, otherwise an Error
     */
    private static createDefaultUser(db: Database): Promise<null | Error> {
        return new Promise((resolve, reject) => {
            db.run("REPLACE INTO user_info VALUES (?, ?)",
                [defaultUsername, UserInfoDB.hashPassword(defaultPassword)], function(this: RunResult, err: Error) {
                    if (err) {
                        logger.error("unable to create default user", {defaultUsername, err});
                        reject(new Error("unable to create default user"));
                    }
                    resolve(null);
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
     *          added to database, otherwise an Error
     */
    public addUser(username: string, password: string): Promise<boolean | Error> {
        return new Promise((resolve: any, reject: any) => {
            if (username && password) {
                if (!this.db) {
                    reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
                }
                const hash = UserInfoDB.hashPassword(password);
                this.db!.run("INSERT INTO user_info VALUES (?, ?)", [username, hash],
                    function(this: RunResult, err: Error | null) {
                        if (err) {
                            logger.error(err);
                            reject(new Error("unable to add user"));
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
     *          from the database, otherwise an Error
     */
    public deleteUser(username: string): Promise<boolean | Error> {
        return new Promise((resolve: any, reject: any) => {
           if (username) {
               if (!this.db) {
                   reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
               }

               this.db!.run("DELETE FROM user_info WHERE username = ?", [username],
                   function(this: RunResult, err: Error | null) {
                       if (err) {
                           reject(new Error("unable to delete user"));
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
     * @returns Promise of a JWT if the user credentials are valid, otherwise an Error
     */
    public login(username: string, password: string): Promise<string | Error> {
        return new Promise((resolve: any, reject: any) => {
            if (username && password) {
                if (!this.db) {
                    reject(UserInfoDB.UNINITIALIZED_DATABASE_ERROR);
                }

                this.db!.get("SELECT password FROM user_info WHERE username = ?", [username],
                    function(this: Statement, err: Error | null, row: { password: string }) {
                        if (err) {
                            logger.error(err);
                            reject(new Error("unable to login user"));
                        }

                        if (row) {
                            if (bcrypt.compareSync(password, row.password)) {
                                const token = jwt.sign(
                                    {
                                        user: username,
                                    },
                                    Buffer.from(secret, "base64"),
                                    {});
                                resolve(token);
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
}
