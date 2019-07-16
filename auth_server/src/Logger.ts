import winston, {format} from "winston";
import {logLevel} from "../config.json";

const logger = winston.createLogger({
    format: format.combine(
            format.splat(),
            format.simple(),
        ),
    level: logLevel,
    transports: [
        new winston.transports.Console(),
    ],
});

export default logger;
