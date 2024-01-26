import { LoginDto, RegisterDto } from '@/DTO/User.dots';
import { UserModel, UserType } from '@/Schemas';
import { createToken } from '@/utilities';
import bcrypt from 'bcrypt';
import { ValidateNested, validateOrReject } from 'class-validator';

export class UserService {
    @ValidateNested()
    User: Partial<UserType>;
    private saltRounds = 10;

    constructor(User: Partial<UserType>) {
        this.User = User;
    }

    register = async (): Promise<UserType> => {
        const userValidation = new RegisterDto({
            name: this.User.name || '',
            email: this.User.email || '',
            password: this.User.password || '',
        });

        await validateOrReject(userValidation);

        const user = await UserModel.findOne({ email: this.User.email });
        if (user) {
            throw {
                message: 'User not created.',
                status: 400,
                error: true,
            };
        }

        const salt = bcrypt.genSaltSync(this.saltRounds);

        const User = new UserModel(this.User);
        validateOrReject(User);

        const hashPassword = bcrypt.hashSync(User.password, salt);
        this.User.password = hashPassword;

        const userToCreate: UserType = {
            created: new Date(),
            updated: new Date(),
            deleted: null,
            active: true,
            userAttempts: 0,
            blocked: false,
            lastLogin: new Date(),
            blockedDate: null,
            attempsLogin: 0,
            passwordID: crypto.randomUUID(),
            name: User.name,
            email: User.email,
            password: User.password,
        };

        this.User = userToCreate;

        const newUser = new UserModel(this.User);
        return newUser.save();
    };

    async login(): Promise<string> {
        const loginValidation = new LoginDto({
            name: this.User.name || '',
            email: this.User.email || '',
            password: this.User.password || '',
        });

        await validateOrReject(loginValidation);

        const user = await UserModel.findOne({
            email: this.User.email,
        });

        if (!user) {
            throw {
                message: 'User or password incorrect',
                status: 404,
                error: true,
            };
        }

        if (user.blockedDate) {
            if (user.blocked && user.blockedDate > new Date()) {
                throw {
                    message: 'User blocked',
                    status: 400,
                    error: true,
                };
            } else if (user.blocked && user.blockedDate < new Date()) {
                user.blocked = false;
                user.blockedDate = null;
                user.userAttempts = 0;
                await user.save();
            }
        }

        const hashPassword = bcrypt.compareSync(
            loginValidation.password,
            user.password || ''
        );

        if (!hashPassword) {
            if (!user.userAttempts) {
                user.userAttempts = 0;
            }
            user.userAttempts += 1;
            if (user.userAttempts >= 3) {
                const dateBlocked = new Date();
                dateBlocked.setHours(dateBlocked.getHours() + 12);
                user.blocked = true;
                user.blockedDate = dateBlocked;
            }
            await user.save();

            throw {
                message: 'User or password incorrect',
                status: 400,
                error: true,
            };
        }

        return createToken(user);
    }

    static getById = async (id: string): Promise<UserType> => {
        const user = await UserModel.findById(id);
        if (!user) {
            throw {
                message: 'User not found',
                status: 404,
                error: true,
            };
        }
        return user;
    };
}
