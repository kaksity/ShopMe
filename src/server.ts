import { Application } from "express";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Server } from "http";
import { AuthenticationResolver, CategoryResolver, HelloWorldResolver, ShopResolver, UserProfileResolver } from "./graphql/resolvers";


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
                resolvers: [HelloWorldResolver, AuthenticationResolver, UserProfileResolver, ShopResolver, CategoryResolver],
            }), 
            context: ({req,res}) => ({req,res})
        });
        await apolloServer.start()
        apolloServer.applyMiddleware({ app });
    }

    public getServerInstance()
    {
        return this.application;
    }
}