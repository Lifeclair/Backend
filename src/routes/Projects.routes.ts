import { Router } from 'express';
import { ProjectsController } from '@/controller';
import { validateToken } from '@/utilities';

export class ProjectRoutes {
    private projectController: ProjectsController = new ProjectsController();
    router = Router();
    version = 'v1';
    path = 'projects';

    initializeRoutes() {
        this.router.post(
            `/${this.path}/${this.version}/create`,
            validateToken,
            this.projectController.createProject
        );

        this.router.get(
            `/${this.path}/${this.version}/user`,
            validateToken,
            this.projectController.getProjectsByUserId
        );

        this.router.get(
            `/${this.path}/${this.version}`,
            validateToken,
            this.projectController.getProjectById
        );

        this.router.post(
            `/${this.path}/${this.version}/complete`,
            validateToken,
            this.projectController.completeDay
        );

        return this.router;
    }
}
