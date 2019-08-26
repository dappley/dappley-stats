import dotenv from "dotenv";
import path from "path";

export enum LogLevel {
    LOG = "log",
    TRACE = "trace",
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    FATAL = "fatal",
}

export type Config = {
    SECRET: string;
    PORT: number;
    NODE_ENV: string;
    LOG_LEVEL: LogLevel;
    DEFAULT_USERNAME: string;
    DEFAULT_PASSWORD: string;
};

export function Config(): Config {
    return process.env as any as Config;
}

/* load configuration */
dotenv.config({path: path.join(__dirname, "..", "default.env")});
