import { UserType } from '@/Schemas';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsNumber,
    IsString,
} from 'class-validator';
import { ObjectId, Types } from 'mongoose';

export class CreateProjectDto {
    @IsString()
    name: string;

    @IsArray()
    days: string[];

    @IsArray()
    hours: string[];

    @IsNumber()
    repetitions: number | undefined | null;

    @IsBoolean()
    end: boolean | undefined | null;

    @IsDate()
    dayOfEnd: Date | undefined | null;

    @IsString()
    description: string | null | undefined;

    User: Types.ObjectId;
    constructor({
        name,
        days,
        hours,
        repetitions,
        end,
        dayOfEnd,
        description,
        User,
    }: CreateProjectDto) {
        this.name = name;
        this.days = days;
        this.hours = hours;
        this.repetitions = repetitions;
        this.end = end;
        this.dayOfEnd = dayOfEnd;
        this.description = description;
        this.User = User;
    }
}
