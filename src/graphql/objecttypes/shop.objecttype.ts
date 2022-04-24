import { Field, ID, ObjectType } from "type-graphql";
import { UserProfileObjectType } from "./userprofile.objecttype";

@ObjectType()
export class ShopObjectType
{
    @Field((type) => ID)
    id: string;

    @Field((type) => UserProfileObjectType)
    user: UserProfileObjectType;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    address?: string;

    @Field({ nullable: true })
    url?: string;
}