import { Column, Entity, ManyToOne } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { UserEntity } from "./user.entity";

@Entity("shops")
export class ShopEntity extends GenericEntity
{
    @ManyToOne(() => UserEntity, (user) => user.shops)
    user: UserEntity;

    @Column()
    name?: string;

    @Column({ type: "longtext" })
    address?: string;

    @Column({ nullable: true })
    url?: string;
}