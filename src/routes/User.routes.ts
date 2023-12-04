import { Router } from 'express';
import { UserController } from '../controller/User.controller';

export class UserRoutes {
    private userController: UserController = new UserController();
    router = Router();
    version = 'v1';
    path = 'user';

    initializeRoutes() {
        this.router.post(
            `${this.path}/${this.version}/login`,
            this.userController.getUserLogin
        );

        return this.router;
    }
}
