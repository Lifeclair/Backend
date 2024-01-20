import { ProjectsType } from '@/Schemas';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsIn,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
    ValidateIf,
} from 'class-validator';
import { Types } from 'mongoose';

type DaysOfTheWeek =
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';
export type DaysOfTheWeekArray = Partial<DaysOfTheWeek>[];
const prueba: DaysOfTheWeekArray = ['Monday'];

export const daysOfTheWeek: DaysOfTheWeekArray = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];
export class CreateProjectDto implements Omit<ProjectsType, 'User' | '_id'> {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    name: string;

    @IsArray()
    @IsString({ each: true })
    @IsIn(daysOfTheWeek, { each: true })
    days: DaysOfTheWeekArray;

    @IsArray()
    hours: string[];

    @IsNumber()
    @ValidateIf((obj, value) => value !== null && value !== undefined)
    repetitions: number | undefined | null;

    @IsBoolean()
    @ValidateIf((obj, value) => value !== null && value !== undefined)
    end: boolean | undefined | null;

    @IsDate()
    @ValidateIf((obj, value) => value !== null && value !== undefined)
    dayOfEnd: Date | undefined | null;

    @IsString()
    @ValidateIf((obj, value) => value !== null && value !== undefined)
    description: string | null | undefined;

    @IsArray()
    doItDays: ProjectsType['doItDays'];

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
    }: Omit<CreateProjectDto, 'daysOfTheWeek' | '_id'>) {
        this.name = name;
        this.days = days;
        this.hours = hours;
        this.repetitions = repetitions;
        this.end = end;
        this.dayOfEnd = dayOfEnd;
        this.description = description;
        this.User = User;
        this.doItDays = [] as unknown as Types.DocumentArray<{
            date: Date;
            complete: boolean;
            day: string;
        }>;
    }
    morning?: boolean | null | undefined;
    afternoon?: boolean | null | undefined;
    night?: boolean | null | undefined;
}

export class GetProjectById {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    id: string;
    constructor({ id }: GetProjectById) {
        this.id = id;
    }
}

export class GetByUserId {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    idUser: string;
    constructor({ idUser }: GetByUserId) {
        this.idUser = idUser;
    }
}

export class Id {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    id: string;
    constructor({ id }: Id) {
        this.id = id;
    }
}
