import { compare, hash } from "bcryptjs";
import { Arg, InputType, Mutation, Resolver } from "type-graphql";
import { getManager } from "typeorm";
import { AuthenticationEntity } from "../../database/entity/authentication.entity";
import { UserEntity } from "../../database/entity/user.entity";
import { signJWTToken } from "../../utility/functions.utility";
import { ForgotPasswordInputType, LoginInputType, RegisterInputType } from "../inputtypes/authentication.inputtype";
import { AuthenticationObjectType, MessageObjectType } from "../objecttypes";

@Resolver()
export class AuthenticationResolver
{

    @Mutation(() => AuthenticationObjectType)
    async login(@Arg("input", () => LoginInputType) input: LoginInputType)
    {
        let authenticationQueryResult;

        authenticationQueryResult = await AuthenticationEntity.createQueryBuilder("authentication").innerJoinAndSelect("authentication.user","user").where("emailAddress = :emailAddress", {emailAddress: input.emailAddress}).getOne();
        
        if (!authenticationQueryResult)
        {
            throw new Error("Invalid login credentials")
        }

        const isPasswordValid: boolean = await compare(input.password, authenticationQueryResult.password);
        
        if (isPasswordValid === false)
        {
            throw new Error("Invalid login credentials")
        }

        console.log(authenticationQueryResult);

        return new AuthenticationObjectType('bearer', signJWTToken({
            userId:authenticationQueryResult.user.id
        }, process.env.JWT_SECRET_KEY), 3600);
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
        });

        const newUserRecord = await UserEntity.create({
            authentication: newAuthenticationRecord,
            firstName: input.firstName,
            middleName: input.middleName,
            lastName: input.lastName
        });

        await getManager().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(newAuthenticationRecord);
            await transactionalEntityManager.save(newUserRecord);
        });

        return new MessageObjectType('User was registered successfully')
    }

    @Mutation(() => MessageObjectType)
    async forgotPassword(@Arg("input", () => ForgotPasswordInputType) input:ForgotPasswordInputType) 
    {
        // Check if the user already exists
        const authenticationQueryResult = await AuthenticationEntity.findOne({
            where:{
                emailAddress: input.emailAddress
            }
        })

        if (!authenticationQueryResult)
        {
            throw new Error("Email Address does not exist in our records")
        }

        // const newAuthenticationRecord = await AuthenticationEntity.create({
        //     emailAddress: input.emailAddress.toLowerCase(),
        //     password: hashedPassword
        // });

        // const newUserRecord = await UserEntity.create({
        //     authentication: newAuthenticationRecord,
        //     firstName: input.firstName,
        //     middleName: input.middleName,
        //     lastName: input.lastName
        // });

        // await getManager().transaction(async transactionalEntityManager => {
        //     await transactionalEntityManager.save(newAuthenticationRecord);
        //     await transactionalEntityManager.save(newUserRecord);
        // });

        return new MessageObjectType('A mail has been sent to you containing password reset link')
    }
}