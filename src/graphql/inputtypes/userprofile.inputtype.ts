import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateUserProfileInputType {
    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    middleName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    phoneNumber?: string;

    @Field({ nullable: true })
    address?: string;
}