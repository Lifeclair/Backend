import type { Request, Response } from 'express';
import { UserService } from '../services/User.service';
import { ResponseApi } from '../models/ResponseApi';
import { UserType } from '../Schemas/User.schema';
import { createError } from '../utilities/createError';
export class UserController {
    private User: typeof UserService = UserService;

    public getUserLogin = async (req: Request, res: Response) => {
        let status = 200;

        const response: ResponseApi<string | string[] | UserType> = {
            error: false,
            data: '',
        };
        const body = req.body;
        const email = body?.email;
        const password = body?.password;

        try {
            const User = new this.User({ email, password });
            const user = await User.Login();
            response.data = user;
        } catch (error) {
            const result = createError(error);
            response.error = true;
            response.data = result.error;
            status = result.status;
        }

        return res.status(status).json(response);
    };

    register = async (req: Request, res: Response) => {
        let status = 200;

        const response: ResponseApi<string | string[] | UserType> = {
            error: false,
            data: '',
        };
        const body = req.body;
        const email = body?.email;
        const password = body?.password;

        try {
            const User = new this.User({ email, password });
            const user = await User.register();
            if (user) {
                response.data = 'User created successfully';
            } else {
                response.data = 'User not created';
            }
        } catch (error) {
            const result = createError(error);
            response.error = true;
            response.data = result.error;
            status = result.status;
        }

        return res.status(status).json(response);
    };
}
