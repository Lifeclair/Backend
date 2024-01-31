import { ExtraDataProjectType } from '@/Schemas';
import { GeneralService } from './General.service';
import { Types } from 'mongoose';
type PartialExtraDataProjectType = Partial<ExtraDataProjectType>;

export class ExtraDataProjectService
    extends GeneralService
    implements PartialExtraDataProjectType
{
    name?: string;
    typeOfData?: string;
    Project?: Types.ObjectId;
    _id?: Types.ObjectId;
    constructor(ExtraDataProject: PartialExtraDataProjectType) {
        super();
        this.name = ExtraDataProject.name;
        this.typeOfData = ExtraDataProject.typeOfData;
        this.Project = ExtraDataProject.Project;
        this._id = ExtraDataProject._id;
    }
}
