import { Column, Entity, OneToOne } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { UserEntity } from "./user.entity";

@Entity("authentications")
export class AuthenticationEntity extends GenericEntity
{
    @Column()
    emailAddress: string;
    
    @Column()
    password: string;
    
    @OneToOne(() => UserEntity, (user) => user.authentication)
    user: UserEntity;
}