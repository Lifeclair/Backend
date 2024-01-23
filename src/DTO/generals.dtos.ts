import { IsString, MaxLength, MinLength } from "class-validator";

export class IdValidate {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    id: string;
    constructor({ id }: {id: string}) {
        this.id = id;
    }
}