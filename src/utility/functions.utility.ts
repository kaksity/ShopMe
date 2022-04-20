import { sign } from "jsonwebtoken";

export function signJWTToken(userInfo: any, secretKey: string)
{
    return sign(userInfo, secretKey, {expiresIn: '1H'});
}