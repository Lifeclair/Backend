import fs from 'fs';
import { UserType } from '../Schemas/User.schema';
import jwt from 'jsonwebtoken';

const privateKey = fs.readFileSync('private_key.pem', 'utf-8');
const publicKey = fs.readFileSync('public_key.pem', 'utf-8');

const createToken = (user: UserType) => {
    const token = jwt.sign(
        {
            id: Object(user).id,
            name: user.name,
            iat: new Date().getTime(),
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
