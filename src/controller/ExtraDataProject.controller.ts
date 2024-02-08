import { ExtraDataProjectType } from '@/Schemas';
import { ResponseApi } from '@/models';
import { ExtraDataProjectService } from '@/services';
import { createError } from '@/utilities';
import { Request, Response } from 'express';

export class ExtraDataProjectContoller {
    private ExtraDataProject: typeof ExtraDataProjectService =
        ExtraDataProjectService;
    create = async (req: Request, res: Response) => {
        const response: ResponseApi<ExtraDataProjectType> = {
            error: false,
            data: '',
            status: 200,
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
        } catch (error) {
            response.error = true;
            const errorResult = createError(error);
            response.data = errorResult.error;
            response.status = errorResult.status;
        }
        return res.status(response.status).json(response);
    };
    addData = async (req: Request, res: Response) => {
        const response: ResponseApi<ExtraDataProjectType> = {
            error: false,
            data: '',
            status: 200,
        };
        try {
            const body = req.body;
            const service = new this.ExtraDataProject({
                _id: body?._id,
                data: body?.data,
            });
            const data = await service.addData();
            response.data = data;
        } catch (error) {
            response.error = true;
            const errorV = createError(error);
            response.data = errorV.error;
        }
        return res.status(500).json(response);
    };
}
