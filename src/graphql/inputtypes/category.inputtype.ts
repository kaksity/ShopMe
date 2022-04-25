import { Field, InputType } from "type-graphql";

@InputType()
export class CreateShopCategoryInputType
{
    @Field()
    shop: string;

    @Field()
    name: string;
}