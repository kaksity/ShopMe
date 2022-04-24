import { sign, verify } from "jsonwebtoken";

export function signJWTToken(userInfo: any, secretKey: string)
{
    return sign(userInfo, secretKey, {expiresIn: '1H'});
}

export function decodeJWTToken(token: string, secretKey: string)
{
    return verify(token, secretKey);
}