import "@tsed/ajv";
import { ServerLoader, ServerSettings } from "@tsed/common";
import bodyParser from "body-parser";
import cors from "cors";
import { Config } from "./Config";
import RootController from "./controllers/RootController";
import logger from "./Logger";
import "./middleware/GlobalErrorHandler";

@ServerSettings({
    ajv: {},
    httpPort: Config().PORT,
    logger: {
        /* log all requests only in debug mode */
        level: Config().LOG_LEVEL === "debug" ? "debug" : "off" as any,
    },
    mount: {
        "/": RootController,
    },
    validationModelStrict: true,
})
export default class Server extends ServerLoader {
    public $beforeRoutesInit(): void {
        this.use(bodyParser.json())
            .use(cors());
    }

    public $onReady(): void {
        logger.info("api server started...");
    }
}
