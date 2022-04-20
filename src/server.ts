import { Application } from "express";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./graphql/resolvers/helloworld.resolvers";
import { Server } from "http";

export class ApplicationServer {
    
    public application: Application;

    /**
     *  
     */
    constructor() {
        this.application = express();
        this.InitializeApolloServer(this.application);
    }

    private async InitializeApolloServer(app: Application)
    {
        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [HelloWorldResolver],
                // context: ({req,res}) => ({req,res})
            }), 
        });
        await apolloServer.start()
        apolloServer.applyMiddleware({ app });
    }

    public getServerInstance()
    {
        return this.application;
    }
}