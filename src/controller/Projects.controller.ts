import { Request, Response } from 'express';
import { ResponseApi } from '@models';
import { ProjectsService } from '@services';
import { createError } from '@utilities';

export class ProjectsController {
    private Projects: typeof ProjectsService = ProjectsService;

    createProject = async (req: Request, res: Response) => {
        let status = 200;

        const response: ResponseApi<string | string[]> = {
            error: false,
            data: '',
        };
        const body = req.body;
        const name = body?.name;
        const description = body?.description;
        const user = body?.user;
        console.log(user);

        try {
            // // const projectObject: ProjectsType = {
            // //     days: [],
            // //     hours: [],
            // // };
            // // const Projects = new this.Projects({
            // //     name,
            // //     description,
            // //     days: [],
            // //     hours: [],
            // // });
            // const project = await Projects.createProject();
            // if (project) {
            //     response.data = 'Project created successfully';
            // } else {
            //     response.data = 'Project not created';
            // }
        } catch (error) {
            const result = createError(error);
            response.error = true;
            response.data = result.error;
            status = result.status;
        }

        return res.status(status).json(response);
    };
}
