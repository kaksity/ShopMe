import { container } from "tsyringe";
import { Arg, Ctx, Mutation, Query, UseMiddleware } from "type-graphql";
import { Context } from "../../interfaces";
import { ShopService } from "../../services";
import { CategoryService } from "../../services/categories.service";
import { CreateShopCategoryInputType } from "../inputtypes";
import { AuthenticationMiddlware } from "../middlewares";
import { MessageObjectType } from "../objecttypes";
import { CategoryObjectType } from "../objecttypes/category.objecttype";

export class CategoryResolver
{
    @Mutation(() => MessageObjectType)
    @UseMiddleware(AuthenticationMiddlware)
    async createShopCategory(
        @Arg("input", () => CreateShopCategoryInputType) input: CreateShopCategoryInputType,
        @Ctx() {user}: Context
    ): Promise<MessageObjectType>
    {
        const shop = await container.resolve(ShopService).getShopById(input.shop, user);

        await container.resolve(CategoryService).createNewShopCategory(input.name, shop);

        return new MessageObjectType("Shop Category was created successfully");
    }
    
    @Query(() => [CategoryObjectType])
    @UseMiddleware(AuthenticationMiddlware)
    async getAllShopCategory(
        @Arg("shopId") shopId:string,
        @Ctx() { user }: Context
    ):Promise<CategoryObjectType[]>
    {
        const shop = await container.resolve(ShopService).getShopById(shopId, user);

        return container.resolve(CategoryService).getAllShopCategory(shop)
    }
    
    @Mutation(() => MessageObjectType)
    @UseMiddleware(AuthenticationMiddlware)
    async updateShopCategory(
        name: string,
        id: string,
        @Ctx() { user }: Context
    ): Promise<MessageObjectType>
    {
        
        await container.resolve(CategoryService).updateShopCategory(name, id);
        return new MessageObjectType("Shop category was updated successfully");
    }

    @Mutation(() => MessageObjectType)
    @UseMiddleware(AuthenticationMiddlware)
    async deleteShopCategory(
        @Arg("id") id:string,
        @Ctx() { user }: Context
    ): Promise<MessageObjectType>
    {
        await container.resolve(CategoryService).deleteShopCategory(id);
        return new MessageObjectType("Shop Category was deleted successfully");
    }
}