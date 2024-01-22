import { ProjectsType } from '@/Schemas';
import { ResponseApi } from '@/models';
import { ProjectsService } from '@/services';
import { createError } from '@/utilities';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

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
            const project = await this.Projects;
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
    };

    getProjectsByUserId = async (req: Request, res: Response) => {
        let status = 200;

        const response: ResponseApi<string | ProjectsType[] | string[]> = {
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
            const project = await Projects.getProjectsByUserId();
            if (project) {
                response.data = project;
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
    };

    completeDay = async (req: Request, res: Response) => {
        let status = 200;

        const response: ResponseApi<string | ProjectsType | string[]> = {
            error: false,
            data: '',
        };
        const body = req.body;
        const user = body?.user;

        const date = new Date(body.date.split('-').reverse().join('-'));

        try {
            const Projects = new this.Projects({
                ...body,
                User: user._id,
            });
            const project = await Projects.completeDay(new Date(date));
            if (project) {
                response.data = project as ProjectsType;
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
    };

    changeState = async (req: Request, res: Response) => {
        let status = 200;

        const response: ResponseApi<string | ProjectsType | string[]> = {
            error: false,
            data: '',
        };
        const body = req.body;
        const user = body?.user;

        const date = new Date(body.date.split('-').reverse().join('-'));

        try {
            const Projects = new this.Projects({
                ...body,
                User: user._id,
            });
            const project = await Projects.changeState(new Date(date));
            if (project) {
                response.data = project as ProjectsType;
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
    };
}
