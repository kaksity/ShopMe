import { compare, hash } from "bcryptjs";
import { injectable } from "tsyringe";
import { getManager } from "typeorm";
import { AuthenticationEntity, UserEntity } from "../database/entity";

@injectable()
export class AuthenticationService {
    async login(emailAddress: string, password: string): Promise<AuthenticationEntity>
    {

        const authenticationQueryResult = await AuthenticationEntity.createQueryBuilder("authentication").innerJoinAndSelect("authentication.user","user").where("emailAddress = :emailAddress", {emailAddress: emailAddress.toLowerCase()}).getOne();
        
        if (!authenticationQueryResult)
        {
            throw new Error("Invalid login credentials")
        }

        const isPasswordValid: boolean = await compare(password, authenticationQueryResult.password);
        
        if (isPasswordValid === false)
        {
            throw new Error("Invalid login credentials")
        }

        return authenticationQueryResult;
    }
    
    async register({firstName, middleName, lastName, emailAddress, password}): Promise<void>{
        
        // Check if the user already exists
        const authenticationQueryResult = await AuthenticationEntity.findOne({
            where:{
                emailAddress
            }
        })

        if (authenticationQueryResult)
        {
            throw new Error("Email address has already been taken")
        }

        const hashedPassword = await hash(password, 12);
        

        const newAuthenticationRecord = await AuthenticationEntity.create({
            emailAddress:emailAddress.toLowerCase(),
            password: hashedPassword
        });

        const newUserRecord = await UserEntity.create({
            authentication: newAuthenticationRecord,
            firstName,
            middleName,
            lastName
        });

        await getManager().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(newAuthenticationRecord);
            await transactionalEntityManager.save(newUserRecord);
        });
    }

    async forgotPassword(emailAddress: string): Promise<void> {
        // Check if the user already exists
        const authenticationQueryResult = await AuthenticationEntity.findOne({
            where:{
                emailAddress
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
    }
}