import { ExtraDataProjectType } from '@/Schemas';

export interface ICreateExtraDataProject
    extends Partial<Omit<ExtraDataProjectType, '_id' | 'Project'>> {
    Project?: string;
}

export interface PartialExtraDataProjectType
    extends Partial<Omit<ExtraDataProjectType, '_id' | 'Project'>> {
    _id?: string;
    Project?: string;
}
