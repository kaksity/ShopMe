import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserProfileObjectType {
    @Field()
    id: string;

    @Field()
    firstName: string;

    @Field({ nullable: true})
    middleName: string;

    @Field()
    lastName: string;

    @Field({ nullable: true})
    phoneNumber: string;

    @Field({ nullable: true})
    address: string;
}