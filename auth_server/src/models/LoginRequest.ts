import {MinLength, Required} from "@tsed/common";

export default class LoginRequest {
    /* TODO: ideally, these decorators would be enforced but
             validation using the AJVService doesn't seem to work
             for BodyParams(); https://tsed.io/tutorials/ajv.html;
             https://github.com/TypedProject/ts-express-decorators/issues/510 */
    @Required()
    @MinLength(1)
    public username!: string;
    @Required()
    @MinLength(1)
    public password!: string;
}
