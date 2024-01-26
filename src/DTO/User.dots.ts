import { UserType } from '@/Schemas';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

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
        | 'passwordID'
    > {}

export class RegisterDto implements Create {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    name: string;

    @IsString()
    @MinLength(4)
    @MaxLength(100)
    email: string;

    @IsString()
    @MinLength(10)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;

    constructor({ name, email, password }: Create) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

interface Login {
    email: UserType['email'] | undefined;
    password: UserType['password'] | undefined;
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
