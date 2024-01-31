import { UserType } from '@/Schemas';
import { ResponseApi } from '@/models';
import { UserService } from '@/services';
import { createError } from '@/utilities';
import type { Request, Response } from 'express';

export class UserController {
    private User: typeof UserService = UserService;

    public login = async (req: Request, res: Response) => {
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
            const user = await User.login();
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
        const name = body?.name;

        try {
            const User = new this.User({ email, password, name });
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
