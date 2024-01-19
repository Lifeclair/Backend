import fs from 'fs';
import jwt from 'jsonwebtoken';
import { UserType } from '@/Schemas';

const privateKey = fs.readFileSync('private_key.pem', 'utf-8');

const createToken = (user: UserType) => {
    const token = jwt.sign(
        {
            sub: Object(user).id,
            name: user.name,
            iat: new Date().getTime(),
            passwordID: user.passwordID,
        },
        privateKey,
        {
            algorithm: 'RS256',
            expiresIn: '1h',
        }
    );
    return token;
};

export { createToken };
