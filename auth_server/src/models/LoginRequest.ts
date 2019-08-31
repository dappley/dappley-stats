import {MinLength, Required} from "@tsed/common";

export default class LoginRequest {
    @Required()
    @MinLength(1)
    public username!: string;
    @Required()
    @MinLength(1)
    public password!: string;
}
