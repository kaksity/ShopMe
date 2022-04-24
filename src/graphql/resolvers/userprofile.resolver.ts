import { container } from "tsyringe";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../interfaces";
import { UserProfileService } from "../../services/userprofile.service";
import { UpdateUserProfileInputType } from "../inputtypes/userprofile.inputtype";
import { AuthenticationMiddlware } from "../middlewares/authentication.middlware";
import { UserProfileObjectType } from "../objecttypes/userprofile.objecttype";

@Resolver()
export class UserProfileResolver {

    @Query(() => UserProfileObjectType)
    @UseMiddleware(AuthenticationMiddlware)
    async getUserProfile(@Ctx() { payload }: Context): Promise<UserProfileObjectType>
    {
        const result = await container.resolve(UserProfileService).getUserDetails(payload.userId);
        console.log(result);
        return result;
    }

    @Mutation(() => String)
    @UseMiddleware(AuthenticationMiddlware)
    async updateUserProfile(
        @Ctx() { payload }: Context,
        @Arg("input", () => UpdateUserProfileInputType) input: UpdateUserProfileInputType
    )
    {
        await container.resolve(UserProfileService).updateUserDetails(input, payload.userId);
        return "Updated User Profile"
    }
}