import { injectable } from "tsyringe";
import { IHelloWorldService } from "../interfaces/ihelloworld.service";

@injectable()
export class HelloWorldService implements IHelloWorldService
{
    public greet(name: string): string {
        return `Hello ${name}`;
    }
    
}