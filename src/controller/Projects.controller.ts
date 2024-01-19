import { ResponseApi } from '@/models';
import { ProjectsService } from '@/services';
import { createError } from '@/utilities';
import { Request, Response } from 'express';

export class ProjectsController {
    private Projects: typeof ProjectsService = ProjectsService;

    createProject = async (req: Request, res: Response) => {
        let status = 200;

        const response: ResponseApi<string | string[]> = {
            error: false,
            data: '',
        };
        const body = req.body;
        const user = body?.user;

        try {
            const Projects = new this.Projects({
                ...body,
                User: user._id,
            });
            const project = await Projects.createProject();
            if (project) {
                response.data = 'Project created successfully';
            } else {
                response.data = 'Project not created';
            }
        } catch (error) {
            const result = createError(error);
            response.error = true;
            response.data = result.error;
            status = result.status;
        }

        return res.status(status).json(response);
    };

    getProjectById = async (req: Request, res: Response) => {
        let status = 200;

        const response: ResponseApi<string | string[]> = {
            error: false,
            data: '',
        };
        const params = req.params;
        const user = req.body?.user;

        try {
            const project = await this.Projects
            if (project) {
                // response.data = project;s
            } else {
                response.data = 'Project not found';
            }
        } catch (error) {
            const result = createError(error);
            response.error = true;
            response.data = result.error;
            status = result.status;
        }

        return res.status(status).json(response);
    }
}
