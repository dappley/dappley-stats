import {ParseExpressionError} from "@tsed/common";
import {
  Err, GlobalErrorHandlerMiddleware, OverrideProvider, Req, Res,
} from "@tsed/common";
import HttpStatus from "http-status-codes";
import logger from "../Logger";

@OverrideProvider(GlobalErrorHandlerMiddleware)
export class GlobalErrorHandler extends GlobalErrorHandlerMiddleware {

  public use(@Err() error: any, @Req() request: Req, @Res() response: Res): any {

    if (error instanceof ParseExpressionError) {
      /* override default behaviour (http://tsed.io/tutorials/ajv.html#validation-error)
        of sending error header and detailed error message to client */
      logger.debug(error);
      response.status(HttpStatus.BAD_REQUEST).end();
      return;
    }

    return super.use(error, request, response);
  }
}
