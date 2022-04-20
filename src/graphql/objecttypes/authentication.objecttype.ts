import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class AuthenticationObjectType
{
    @Field()
    accessToken: string;

    @Field(() => Int)
    expires: number;
}