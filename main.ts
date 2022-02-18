import {startServer} from "./server"
import {connect} from "./configuration/typeorm";

async function main(){
    connect();
    const port:Number = 9000;
    const app = await startServer();
    app.listen(port);
    console.log("App is running on port", port);
}
main();