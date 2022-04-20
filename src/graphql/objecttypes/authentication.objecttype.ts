import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class AuthenticationObjectType
{
    /**
     *
     */
    constructor(tokenType: string, accessToken: string, expires: number) {
        this.tokenType = tokenType;
        this.accessToken = accessToken;
        this.expires = expires;
    }
    
    @Field()
    tokenType: string
    @Field()
    accessToken: string;

    @Field(() => Int)
    expires: number;
}