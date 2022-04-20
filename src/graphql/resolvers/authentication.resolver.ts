import { hash } from "bcryptjs";
import { Arg, InputType, Mutation, Resolver } from "type-graphql";
import { AuthenticationEntity } from "../../database/entity/authentication.entity";
import { UserEntity } from "../../database/entity/user.entity";
import { RegisterInputType } from "../inputtypes/authentication.inputtype";
import { AuthenticationObjectType, MessageObjectType } from "../objecttypes";

@Resolver()
export class AuthenticationResolver
{

    @Mutation(() => AuthenticationObjectType)
    login()
    {

    }

    @Mutation(() => MessageObjectType)
    async register(@Arg("input",() => RegisterInputType) input: RegisterInputType) 
    {
        // Check if the user already exists
        const authenticationQueryResult = await AuthenticationEntity.findOne({
            where:{
                emailAddress: input.emailAddress
            }
        })

        if (authenticationQueryResult)
        {
            throw new Error("Email address has already been taken")
        }

        const hashedPassword = await hash(input.password, 12);
        

        const newAuthenticationRecord = await AuthenticationEntity.create({
            emailAddress: input.emailAddress.toLowerCase(),
            password: hashedPassword
        }).save();

        await UserEntity.create({
            authentication: newAuthenticationRecord,
            firstName: input.firstName,
            middleName: input.middleName,
            lastName: input.lastName
        }).save();

        return new MessageObjectType('User was registered successfully')
    }

    @Mutation(() => MessageObjectType)
    forgotPassword() 
    {

    }
}