import {createConnection} from "typeorm";
import path from "path";
import { environments } from "./environments";


export async function connect() {
    await createConnection({
        type: "postgres",
        port: Number(environments.DB_PORT),
        username: environments.DB_USERNME,
        password:environments.DB_PASSWORD,
        database:environments.DB_DATABASE,
        entities: [
            path.join(__dirname, "../OperacionesEntity/**/**.ts")
        ],
        synchronize:true,

    })

}
