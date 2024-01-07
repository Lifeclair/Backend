import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { verify } from 'jsonwebtoken';
import { TokenPayload } from '../models/Token';

const publicKey = readFileSync('public_key.pem', 'utf-8');

export const validateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: true,
        });
    }
    const tokenSplit = token.split('Bearer ');
    return verify(tokenSplit[1], publicKey, (err, decoded: TokenPayload) => {
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized',
                error: true,
            });
        }
        req.body.user = decoded.sub;
        return next();
    });
};
