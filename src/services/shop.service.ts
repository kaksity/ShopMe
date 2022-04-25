import { injectable } from "tsyringe";
import { ShopEntity, UserEntity } from "../database/entity";


@injectable()
export class ShopService
{
    public async createNewShop({name, address}:any, user: UserEntity): Promise<void>
    {
        await ShopEntity.insert({
            user,
            name,
            address
        });
    }
    public async getAllShops(user: UserEntity): Promise<ShopEntity[]>
    {
        return await ShopEntity.find({
            relations:['user'],
            where:{
                user
            }
        });
    }
    public async getShopById(shopId: string, user: UserEntity): Promise<ShopEntity>
    {
        const shop = await ShopEntity.findOne({
            relations: ['user'],
            where:{
                id: shopId,
                user
            }
        })
        if(!shop)
        {
            throw new Error("Shop does not exist");
        }
        return shop;
    }
    public async updateShopDetails({name, address}: any, shopId: string, user: UserEntity): Promise<void>
    {
        const shop = await ShopEntity.findOne({
            where:{
                id: shopId,
                user
            }
        })
        if(!shop)
        {
            throw new Error("Shop does not exist");
        }
        
        name === null ? shop.name = shop.name : shop.name = name;
        address === null ? shop.address = shop.address : shop.address = address;

        await shop.save();
    }
    public async deleteShop(shopId: string, user: UserEntity): Promise<void>
    {
        const shop = await ShopEntity.findOne({
            where:{
                id: shopId,
                user
            }
        })
        if(!shop)
        {
            throw new Error("Shop does not exist");
        }
        await shop.softRemove()
    }
}