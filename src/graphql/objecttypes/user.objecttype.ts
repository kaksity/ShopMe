import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserObjectType 
{
    @Field()
    id: string;

    @Field()
    firstName: string;

    @Field()
    middleName?: string;

    @Field()
    lastName: string;
    
    @Field()
    phoneNumber: string;

    @Field()
    address: string;
}