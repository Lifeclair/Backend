import { UserController } from '@/controller';
import { Router } from 'express';

export class UserRoutes {
    private userController: UserController = new UserController();
    router = Router();
    version = 'v1';
    path = 'user';

    initializeRoutes() {
        this.router.post(
            `/${this.path}/${this.version}/login`,
            this.userController.login
        );

        this.router.post(
            `/${this.path}/${this.version}/register`,
            this.userController.register
        );

        return this.router;
    }
}
