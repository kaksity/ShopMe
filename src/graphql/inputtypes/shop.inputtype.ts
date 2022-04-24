import { Field, InputType } from "type-graphql";

@InputType()
export class CreateShopInputType
{
    @Field()
    name: string;

    @Field()
    address: string;
}

@InputType()
export class UpdateShopInputType
{
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    address?: string;
}