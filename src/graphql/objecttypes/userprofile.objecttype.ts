import { Field, Resolver } from "type-graphql";

@Resolver()
export class UserProfileObjectType {
    @Field()
    id: string;

    @Field()
    firstName: string;

    @Field()
    middleName: string;

    @Field()
    lastName: string;

    @Field()
    phoneNumber: string;

    @Field()
    address: string;
}