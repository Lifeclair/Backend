import { ResponseApi } from '@/models';
import { ExtraDataProjectService } from '@/services';
import { createError } from '@/utilities';
import { Request, Response } from 'express';

export class ExtraDataProjectContoller {
    private ExtraDataProject: typeof ExtraDataProjectService =
        ExtraDataProjectService;
    create = async (req: Request, res: Response) => {
        const response: ResponseApi<unknown> = {
            error: false,
            data: '',
        };
        try {
            const body = req.body;

            const service = new this.ExtraDataProject({
                name: body?.name,
                typeOfData: body?.typeOfData,
                Project: body?.Project,
                data: body?.data,
            });
            const data = await service.create();
            response.data = data;
            res.status(201).json(response);
        } catch (error) {
            response.error = true;
            response.data = createError(error);
            res.status(500).json(response);
        }
    };
}
