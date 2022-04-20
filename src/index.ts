import "reflect-metadata";
import {createConnection} from "typeorm";
import { ApplicationServer } from "./server";
import http from "http";
import { create } from "domain";

const server = new ApplicationServer();
const hostname = process.env.SERVER_HOSTNAME || 'localhost';
const port = process.env.SERVER_PORT || 30000;

(async() => {
    try {

        await createConnection();
        console.log('Connected to the Database');
        
        const httpServer = http.createServer(server.getServerInstance());
        await httpServer.listen({hostname,port});
        
        console.log(`HTTP Server is up and running at http://${hostname}:${port}`);
        
    } catch (error) {
        console.log('Unable to start Server')
    }
})()



