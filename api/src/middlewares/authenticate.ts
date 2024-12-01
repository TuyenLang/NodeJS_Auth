import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";



export interface AuthReuest extends Request {
    userId: string;
}

const authenticate = (req: Request, res: Response,  next: NextFunction) => {
    try {
        const token = req.header('Authorization');

        if(!token){
             res.status(401).json({message: 'Token is required'});
             return;
        }

        const parsedText = token.split(' ')[1];
        const decoded = verify(parsedText, config.jwtSecret as string);
        const _request = req as AuthReuest;
        _request.userId = decoded.sub as string;
        return next();
    } catch (error) {
         res.status(401).json({message: 'Token is invalid'});
         return;
         
    }


}
export default authenticate;