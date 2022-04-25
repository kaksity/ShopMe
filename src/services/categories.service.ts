import { injectable } from "tsyringe";
import { CategoryEntity, ShopEntity } from "../database/entity";

@injectable()
export class CategoryService
{
    async createNewShopCategory(name: string, shop: ShopEntity): Promise<void>
    {
        await CategoryEntity.insert({
            name,
            shop
        });
    }
    async getAllShopCategory(shop: ShopEntity): Promise<CategoryEntity[]>
    {
        return await CategoryEntity.find({
            relations: ['shop'],
            where:{
                shop
            }
        });
    }

    async updateShopCategory(name: string, id: string): Promise<void>
    {
        const category = await CategoryEntity.findOne({
            where:{
                id
            }
        });

        if (!category)
        {
            throw new Error("Shop Category does not exist");
        }

        category.name = name;
        await category.save();
    }
    
    async deleteShopCategory(id: string): Promise<void>
    {
        const category = await CategoryEntity.findOne({
            where:{
                id
            }
        });

        if (!category)
        {
            throw new Error("Shop Category does not exist");
        }

        await category.softRemove();
    }
}