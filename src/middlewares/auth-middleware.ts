/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Request, Response, NextFunction} from 'express';

import jwt from 'jsonwebtoken';
import {sendError} from '../utils/response_utils';
declare global {
    namespace Express{
        export interface Request{
            session:{
                userId : string;
                email : string;
            };
        }
    }
} 


export const checkAuth = (
req:Request,
res:Response, next: NextFunction) =>{
try{
    const {token} = req.headers;

    if(!token){
        throw new Error("missing header token");
    }

    const {userId, email}  = jwt.verify(
        token as string,
        process.env.JWT_SECRET!) as any;  
    req.session = {
        userId,
        email,
    };
    next();

}catch(e){    
    sendError(res,e);
}
};

export const checkIp = (
    req:Request,
    res:Response, next: NextFunction): void =>{
       if(req.hostname === 'localhost'){
        next();  
       }else{
        res.status(403).send('Access denied');
       } 
    
};
