import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class MessageObjectType 
{
    /**
     *
     */
    constructor(message: string) {
        this.message = message
    }
    @Field()
    message: string;
}