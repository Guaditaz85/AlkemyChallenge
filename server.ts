import express  from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { OperacionesRealizadas} from "./Resolver/operacionesRealizadas";
import { buildSchema } from "graphql";
import { Login } from "./usuario/login";


export async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({ resolvers: [OperacionesRealizadas, Login] })
    });
    apolloServer.applyMiddleware({app, path:"/graphql"});
    return app;
}