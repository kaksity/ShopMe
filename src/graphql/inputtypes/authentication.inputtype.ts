import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInputType
{
    @Field()
    firstName: string;

    @Field({ nullable: true })
    middleName: string;

    @Field()
    lastName: string;

    @Field()
    emailAddress: string;

    @Field()
    password: string;
}

@InputType()
export class LoginInputType
{
    @Field()
    emailAddress: string;

    @Field()
    password: string;
}

@InputType()
export class ForgotPasswordInputType
{
    @Field()
    emailAddress: string;
}