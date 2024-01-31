import { ResponseApi } from '@/models';
import { ExtraDataProjectService } from '@/services';
import { createError } from '@/utilities';
import { Request, Response } from 'express';

export class ExtraDataProjectContoller {
    private ExtraDataProject: typeof ExtraDataProjectService =
        ExtraDataProjectService;
}
