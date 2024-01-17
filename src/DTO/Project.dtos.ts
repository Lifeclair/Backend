import {
    IsArray,
    IsBoolean,
    IsDate,
    IsIn,
    IsNumber,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
    ValidateIf,
    maxLength,
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
export class CreateProjectDto {
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
    }: Omit<CreateProjectDto, 'daysOfTheWeek'>) {
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
