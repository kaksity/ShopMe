import { Field, ID, ObjectType } from "type-graphql";
import { ShopObjectType } from "./shop.objecttype";

@ObjectType()
export class CategoryObjectType 
{
    @Field(() => ID)
    id: string;
    
    @Field((type) => ShopObjectType)
    shop: ShopObjectType;

    @Field()
    name: string;
}