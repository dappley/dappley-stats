import "./src/Config";
import Server from "./src/Server";
import {UserInfoDB} from "./src/UserInfoDB";

/* main */
(async () => {
    const db = UserInfoDB.getInstance();
    await db.init();
    await db.createDefaultUser();
    await new Server().start();
})();
