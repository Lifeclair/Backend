import { IAddData, ICreateExtraDataProject } from '@/models';
import {
    IsArray,
    IsIn,
    IsString,
    MaxLength,
    MinLength,
    ValidateIf,
} from 'class-validator';
import { Types } from 'mongoose';

export class AddData implements IAddData {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    id: string;

    @IsArray()
    data?: Types.DocumentArray<{
        day: Date;
        information: string;
        id: string;
    }>;

    constructor({ id, data }: IAddData) {
        this.id = id || '';
        this.data = data;
    }
}

export class CreateExtraData implements ICreateExtraDataProject {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name?: string;

    @IsString()
    typeOfData?: string;

    @IsIn(['String', 'Number', 'Boolean', 'Date'])
    @IsArray()
    @ValidateIf((object, value) => value !== undefined)
    data?: Types.DocumentArray<{
        day: Date;
        information: string;
        id: string;
    }>;

    @IsString()
    Project?: string;

    constructor({ name, typeOfData, data, Project }: ICreateExtraDataProject) {
        this.name = name;
        this.typeOfData = typeOfData;

        this.data = data;

        this.Project = Project;
    }
}
