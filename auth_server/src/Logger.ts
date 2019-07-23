import tracer from "tracer";
import {logLevel} from "../config.json";

const logger = tracer.colorConsole({
    format : "{{timestamp}} [{{file}}:{{line}}] [{{title}}]: {{message}}",
    level: logLevel,
});

export default logger;
