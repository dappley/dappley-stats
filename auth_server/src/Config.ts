import dotenv from "dotenv";
import path from "path";

export type Config = {
    SECRET: string;
    PORT: number;
    NODE_ENV: string;
    LOG_LEVEL: string;
    DEFAULT_USERNAME: string;
    DEFAULT_PASSWORD: string;
};

export function Config(): Config {
    return process.env as any as Config;
}

/* load configuration */
dotenv.config({path: path.join(__dirname, "..", "default.env")});
