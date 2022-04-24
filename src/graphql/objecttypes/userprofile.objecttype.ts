import { Field, ObjectType } from "type-graphql";
import { ShopEntity } from "../../database/entity/shop.entity";
import { ShopObjectType } from "./shop.objecttype";

@ObjectType()
export class UserProfileObjectType {
    @Field()
    id: string;

    @Field()
    firstName: string;

    @Field({ nullable: true})
    middleName?: string;

    @Field()
    lastName: string;

    @Field({ nullable: true})
    phoneNumber?: string;

    @Field({ nullable: true})
    address?: string;
    
    @Field((type) => [ShopObjectType], { nullable: true })
    shops?: ShopObjectType[]
}