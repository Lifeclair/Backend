import { Router } from 'express';
import { ExtraDataProjectContoller, ProjectsController } from '@/controller';
import { validateToken } from '@/utilities';

export class ExtraDataProjectRoutes {
    private projectController: ExtraDataProjectContoller =
        new ExtraDataProjectContoller();
    router = Router();
    version = 'v1';
    path = 'extraDataProject';

    initializeRoutes() {
        return this.router;
    }
}
