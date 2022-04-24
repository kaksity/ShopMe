import {Entity, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { AuthenticationEntity } from "./authentication.entity";
import { GenericEntity } from "./generic.entity";
import { ShopEntity } from "./shop.entity";

@Entity("users")
export class UserEntity extends GenericEntity {

    @OneToOne(() => AuthenticationEntity,(authentication) => authentication.user)
    @JoinColumn()
    authentication: AuthenticationEntity;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    middleName?: string;

    @Column()
    lastName: string;
    
    @Column({ nullable: true })
    phoneNumber?: string;

    @Column({ nullable: true })
    address?: string;

    @OneToMany(() => ShopEntity, (shop) => shop.user)
    shops?: ShopEntity[];
}
