import { container } from "tsyringe";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../interfaces";
import { ShopService } from "../../services/shop.service";
import { CreateShopInputType, UpdateShopInputType } from "../inputtypes";
import { AuthenticationMiddlware } from "../middlewares";
import { MessageObjectType, ShopObjectType } from "../objecttypes";

@Resolver()
export class ShopResolver
{
    @Mutation(() => MessageObjectType)
    @UseMiddleware(AuthenticationMiddlware)
    async createNewShop(
        @Arg("input", () => CreateShopInputType) input: CreateShopInputType,
        @Ctx() {user}: Context
    ): Promise<MessageObjectType>
    {
        await container.resolve(ShopService).createNewShop(input,user)
        return await new MessageObjectType("Shop was created successfully");
    }

    @Query(() => [ShopObjectType])
    @UseMiddleware(AuthenticationMiddlware)
    async getAllShops(
        @Ctx() {user}: Context
    ): Promise<ShopObjectType[]>
    {
        return await container.resolve(ShopService).getAllShops(user);
    }

    @Query(() => ShopObjectType)
    @UseMiddleware(AuthenticationMiddlware)
    async getShopDetails(
        @Arg("id") id: string,
        @Ctx() { user }: Context
    ): Promise<ShopObjectType>
    {
        return await container.resolve(ShopService).getShopById(id, user);
    }

    @Mutation(() => MessageObjectType)
    @UseMiddleware(AuthenticationMiddlware)
    async updateShopDetails(
        @Arg("input", () => UpdateShopInputType) input: UpdateShopInputType,
        @Arg("id") id: string,
        @Ctx() { user }: Context
    ): Promise<MessageObjectType>
    {
        await container.resolve(ShopService).updateShopDetails(input, id, user);
        return new MessageObjectType("Shop was updated successfully");
    }

    @Mutation(() => MessageObjectType)
    @UseMiddleware(AuthenticationMiddlware)
    async deleteShop(
        @Arg("id") id: string,
        @Ctx() { user }: Context
    ): Promise<MessageObjectType>
    {
        await container.resolve(ShopService).deleteShop(id, user);
        return new MessageObjectType("Shop was deleted successfully");
    }
}