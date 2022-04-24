import { container } from "tsyringe";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../interfaces";
import { UserProfileService } from "../../services";
import { UpdateUserProfileInputType } from "../inputtypes";
import { AuthenticationMiddlware } from "../middlewares";
import { MessageObjectType, UserProfileObjectType } from "../objecttypes";


@Resolver()
export class UserProfileResolver {

    @Query(() => UserProfileObjectType)
    @UseMiddleware(AuthenticationMiddlware)
    async getUserProfile(@Ctx() { user }: Context): Promise<UserProfileObjectType>
    {
        const result = await container.resolve(UserProfileService).getUserDetails(user.id);
        return result;
    }

    @Mutation(() => MessageObjectType)
    @UseMiddleware(AuthenticationMiddlware)
    async updateUserProfile(
        @Ctx() { user }: Context,
        @Arg("input", () => UpdateUserProfileInputType) input: UpdateUserProfileInputType
    )
    {
        await container.resolve(UserProfileService).updateUserDetails(input, user.id);
        return new MessageObjectType("Updated User Profile");
    }
}