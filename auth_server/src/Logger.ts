import tracer from "tracer";
import { Config } from "./Config";

const logger = tracer.colorConsole({
    format : "{{timestamp}} [{{file}}:{{line}}] [{{title}}]: {{message}}",
    level: Config().LOG_LEVEL,
});

export default logger;
