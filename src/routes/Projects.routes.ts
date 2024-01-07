import { Router } from 'express';
import { ProjectsController } from '../controller/Projects.controller';
import { validateToken } from '../utilities/validateToken';

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

        return this.router;
    }
}