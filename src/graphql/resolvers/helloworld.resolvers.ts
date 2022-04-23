import { autoInjectable, container, inject } from "tsyringe";
import { Arg, Query, Resolver } from "type-graphql";
import { HelloWorldService } from "../../services/implementations/helloworld.service";
import { IHelloWorldService } from "../../services/interfaces/ihelloworld.service";

@Resolver()
export class HelloWorldResolver {
    /**
     *
     */
    constructor() {
    }
    @Query(() => String)
    helloWorld(@Arg("name", () => String) name: string): string {
        return container.resolve(HelloWorldService).greet(name);
    }
}