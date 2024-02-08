import { AddData, CreateExtraData } from '@/DTO';
import { ExtraDataProjectModel, ExtraDataProjectType } from '@/Schemas';
import { PartialExtraDataProjectType } from '@/models';
import { Types } from 'mongoose';
import { GeneralService } from './General.service';

export class ExtraDataProjectService
    extends GeneralService
    implements PartialExtraDataProjectType
{
    ExtraDataProjectModel = ExtraDataProjectModel;

    name?: string;
    typeOfData?: string;
    Project?: string;
    _id?: string;
    data?: ExtraDataProjectType['data'];

    constructor(ExtraDataProject: PartialExtraDataProjectType) {
        super();
        this.name = ExtraDataProject.name;
        this.typeOfData = ExtraDataProject.typeOfData;
        this.Project = ExtraDataProject.Project;
        this._id = ExtraDataProject._id;
        this.data = ExtraDataProject.data;
    }
    async create(): Promise<ExtraDataProjectType> {
        const project = new CreateExtraData({
            name: this.name,
            typeOfData: this.typeOfData,
            Project: this.Project,
            data: this.data,
        });
        await this.transformValidatorErrors(project);
        const projectCrated = await this.ExtraDataProjectModel.create(this);
        return projectCrated;
    }
    async addData(): Promise<ExtraDataProjectType> {
        const project = new AddData({
            data: this.data,
            id: this._id,
        });
        await this.transformValidatorErrors(project);
        const projectUpdated = await this.ExtraDataProjectModel.findById({
            _id: this._id,
        });
        if (!projectUpdated) {
            throw {
                message: 'Project not found',
                status: 404,
                error: true,
            };
        }
        if (Array.isArray(this.data)) {
            projectUpdated.data.push(this.data);
        }
        await projectUpdated.save();

        return projectUpdated;
    }
}
