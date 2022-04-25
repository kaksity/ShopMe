import { Column, Entity, ManyToOne } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { ShopEntity } from "./shop.entity";

@Entity("categories")
export class CategoryEntity extends GenericEntity
{
    @ManyToOne(() => ShopEntity, (shop) => shop.categories)
    shop: ShopEntity;

    @Column()
    name: string;

}