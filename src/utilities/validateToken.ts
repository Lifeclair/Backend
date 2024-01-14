import { TokenPayload } from '@/models';
import { UserService } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { verify } from 'jsonwebtoken';
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
    return verify(tokenSplit[1], publicKey, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized',
                error: true,
            });
        }
        const user = await UserService.getById((decoded as TokenPayload).sub);

        req.body.user = user;

        return next();
    });
};
