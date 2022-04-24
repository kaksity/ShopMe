import { injectable } from "tsyringe";
import { MiddlewareFn, MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { UserEntity } from "../../database/entity/user.entity";
import { Context, IJwtPayload } from "../../interfaces";
import { decodeJWTToken } from "../../utility/functions.utility";

@injectable()
export class AuthenticationMiddlware implements MiddlewareInterface<Context> {
    public use: MiddlewareFn<Context> = ({ context, info }: ResolverData<Context>, next: NextFn) => {
        try {
            const authHeader = context.req.headers.authorization;
            
            if (!authHeader)
            {
                throw new Error("You need to log in");    
            }

            const token = authHeader.split(' ')[1];
            
            const decodedToken = decodeJWTToken(token,process.env.JWT_SECRET_KEY) as IJwtPayload;
            
            context.user = decodedToken.user;
            return next();            
        } catch (error) {
            throw new Error("You need to log in");
        }
    };
}