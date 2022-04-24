import { injectable } from "tsyringe";
import { UserEntity } from "../database/entity/user.entity";

@injectable()
export class UserProfileService
{
    public async getUserDetails(userId: string): Promise<UserEntity>
    {
        const results = await UserEntity.findOne({
            relations: ['shops'],
            where:{
                id: userId
            }
        })
        if (!results)
        {
            throw new Error("User record does not exist");
        }
        return results;            
    }
    public async updateUserDetails({firstName, middleName, lastName, phoneNumber, address}:any, userId: string): Promise<void>
    {
        const user = await UserEntity.findOne({
            where:{
                id: userId
            }
        })
        if (!user)
        {
            throw new Error("User record does not exist");
        }

        firstName == null ? user.firstName = user.firstName : user.firstName = firstName;
        middleName == null ? user.middleName = user.middleName : user.middleName = middleName;
        lastName == null ? user.lastName = user.lastName : user.lastName = lastName;
        phoneNumber == null ? user.phoneNumber = user.phoneNumber : user.phoneNumber = phoneNumber;
        address == null ? user.address = user.address : user.address = address;

        await user.save()
    }
}