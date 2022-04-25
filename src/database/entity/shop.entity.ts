import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { GenericEntity } from "./generic.entity";
import { UserEntity } from "./user.entity";

@Entity("shops")
export class ShopEntity extends GenericEntity
{
    @ManyToOne(() => UserEntity, (user) => user.shops)
    user: UserEntity;

    @OneToMany(() => CategoryEntity, (categories) => categories.shop)
    categories: CategoryEntity[];
    
    @Column()
    name?: string;

    @Column({ type: "longtext" })
    address?: string;

    @Column({ nullable: true })
    url?: string;
}