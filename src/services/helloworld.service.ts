import { injectable } from "tsyringe";

@injectable()
export class HelloWorldService 
{
    public greet(name)
    {
        return `Hello ${name}`;
    }
}