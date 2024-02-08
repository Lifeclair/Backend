import { ExtraDataProjectType } from '@/Schemas';

export interface ICreateExtraDataProject
    extends Partial<Omit<ExtraDataProjectType, '_id' | 'Project'>> {
    Project?: string;
}

export interface IAddData {
    id?: string;
    data?: ExtraDataProjectType['data'];
}

export interface PartialExtraDataProjectType
    extends Partial<Omit<ExtraDataProjectType, '_id' | 'Project'>> {
    _id?: string;
    Project?: string;
}
