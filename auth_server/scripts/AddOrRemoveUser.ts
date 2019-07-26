import {UserInfoDB} from "../src/UserInfoDB";

/*
 usage:
 node AddOrRemoveUser add <username> <password>
 node AddOrRemoveUser remove <username>
*/

(async () => {
    try {
        if (process.argv[2] === "add" && process.argv.length === 5) {
            await UserInfoDB.getInstance().init();
            const username = process.argv[3];
            const res = await UserInfoDB.getInstance().addUser(username, process.argv[4]);
            // tslint:disable-next-line no-console
            console.log(`${res ? "Successfully created" : "Unable to create new"} user '${username}'`);
        } else if (process.argv[2] === "remove" && process.argv.length === 4) {
            await UserInfoDB.getInstance().init();
            const username = process.argv[3];
            const res = await UserInfoDB.getInstance().deleteUser(username);
            // tslint:disable-next-line no-console
            console.log(`${res ? "Deleted" : "Unable to delete"} user '${username}'`);
        } else {
            // tslint:disable-next-line no-console
            console.log(
                `usage:
                    add    <username> <password>
                    remove <username>
                `);
        }
    } catch (e) {
        // tslint:disable-next-line no-console
        console.error(e);
    }
})();
