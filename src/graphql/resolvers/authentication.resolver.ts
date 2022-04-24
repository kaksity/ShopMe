import { container } from "tsyringe";
import { Arg, InputType, Mutation, Resolver } from "type-graphql";
import { AuthenticationService } from "../../services/authentication.service";
import { signJWTToken } from "../../utility/functions.utility";
import { ForgotPasswordInputType, LoginInputType, RegisterInputType } from "../inputtypes/authentication.inputtype";
import { AuthenticationObjectType, MessageObjectType } from "../objecttypes";

@Resolver()
export class AuthenticationResolver
{

    @Mutation(() => AuthenticationObjectType)
    async login(@Arg("input", () => LoginInputType) input: LoginInputType)
    {
        let result = await container.resolve(AuthenticationService).login(input.emailAddress, input.password)

        return new AuthenticationObjectType('bearer', signJWTToken({
            userId: result.user.id
        }, process.env.JWT_SECRET_KEY), 3600);
    }

    @Mutation(() => MessageObjectType)
    async register(@Arg("input",() => RegisterInputType) input: RegisterInputType) 
    {
        await container.resolve(AuthenticationService).register(input);
        return new MessageObjectType('User was registered successfully')
    }

    @Mutation(() => MessageObjectType)
    async forgotPassword(@Arg("input", () => ForgotPasswordInputType) input:ForgotPasswordInputType) 
    {
        await container.resolve(AuthenticationService).forgotPassword(input.emailAddress);
        return new MessageObjectType('A mail has been sent to you containing password reset link')
    }
}