import dotenv from "dotenv";
dotenv.config()
import "reflect-metadata";
import {createConnection} from "typeorm";
import { ApplicationServer } from "./server";
import http from "http";
import { create } from "domain";
import { resolveContainer } from "./container";
import { container } from "tsyringe";
import { HelloWorldResolver } from "./graphql/resolvers";

const server = new ApplicationServer();
const hostname = process.env.SERVER_HOSTNAME || 'localhost';
const port = process.env.SERVER_PORT || 30000;

(async() => {
    try {

        await createConnection();
        console.log('Connected to the Database');
        
        resolveContainer();
        
        const httpServer = http.createServer(server.getServerInstance());
        await httpServer.listen({hostname,port});
        
        console.log(`HTTP Server is up and running at http://${hostname}:${port}`);
        
    } catch (error) {
        console.log('Unable to start Server')
    }
})()



