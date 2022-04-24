import { Request, Response } from "express";
import { UserEntity } from "../database/entity/user.entity";

export interface Context
{
    req: Request,
    res: Response,
    user?: UserEntity
}