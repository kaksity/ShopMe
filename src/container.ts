import { container } from "tsyringe";
import { HelloWorldService } from "./services/implementations/helloworld.service";

export function resolveContainer()
{
    container.register('HelloWorldService', HelloWorldService);
}