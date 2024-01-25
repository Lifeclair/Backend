import { UserType } from '@/Schemas';
import { IsString, MaxLength, MinLength } from 'class-validator';

interface Create
    extends Omit<
        UserType,
        | '_id'
        | 'created'
        | 'updated'
        | 'active'
        | 'userAttempts'
        | 'blocked'
        | 'deleted'
        | 'lastLogin'
        | 'blockedDate'
        | 'attempsLogin'
    > {}

export class CreateDto implements Create {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    name: string;

    @IsString()
    @MinLength(4)
    @MaxLength(100)
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(100)
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(10)
    passwordID: string;

    constructor({ name, email, password, passwordID }: Create) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.passwordID = passwordID;
    }
}

interface Login {
    email: UserType['email'];
    password: UserType['password'];
}

export class LoginDto implements Login {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(100)
    password: string;

    constructor({ email, password }: Create) {
        this.email = email;
        this.password = password;
    }
}
