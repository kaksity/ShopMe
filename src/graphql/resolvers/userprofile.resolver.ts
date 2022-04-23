import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UpdateUserProfileInputType } from "../inputtypes/userprofile.inputtype";
import { UserProfileObjectType } from "../objecttypes/userprofile.objecttype";

@Resolver()
export class UserProfileResolver {

    @Query(() => UserProfileObjectType)
    async getUserProfile(): Promise<UserProfileObjectType>
    {
        return new UserProfileObjectType()
    }

    @Mutation(() => String)
    async updateUserProfile(@Arg("input", () => UpdateUserProfileInputType) input: UpdateUserProfileInputType)
    {
        return "Updated User Profile"
    }
}