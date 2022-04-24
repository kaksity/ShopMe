import {Entity, Column, OneToOne, JoinColumn} from "typeorm";
import { AuthenticationEntity } from "./authentication.entity";
import { GenericEntity } from "./generic.entity";

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
    phoneNumber: string;

    @Column({ nullable: true })
    address: string;
}
