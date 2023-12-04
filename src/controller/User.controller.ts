import type { Request, Response } from 'express';
import { UserService } from '../services/User.service';
import { ResponseApi } from '../models/ResponseApi';
import { UserType } from '../Schemas/User.schema';

export class UserController {
    private User: typeof UserService = UserService;
    constructor() {}

    public async getUserLogin(req: Request, res: Response) {
        let status = 200;

        const response: ResponseApi<string | string[] | UserType> = {
            error: false,
            data: '',
        };

        const email = req.body.email;
        const password = req.body.password;

        try {
            const User = new this.User({ email, password });
            const user = await User.getUserLogin();
            response.data = user;
        } catch (error) {
            const result = createError(error);
            response.error = true;
            response.data = result.error;
            status = result.status;
        }

        return res.status(status).json(response);
    }
}
