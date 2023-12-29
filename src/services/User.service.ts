import { ValidateNested } from 'class-validator';
import { UserModel, UserType } from '../Schemas/User.schema';
import bcrypt from 'bcrypt';

export class UserService {
    @ValidateNested()
    User: UserType;
    private saltRounds = 10;

    constructor(User: UserType) {
        this.User = User;
    }

    public async Login(): Promise<UserType> {
        if (!this.User.email || !this.User.password) {
            throw {
                message: 'User or password incorrect',
                status: 400,
                error: true,
            };
        }

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

        const hashPassword = bcrypt.compareSync(
            this.User.password,
            user.password
        );

        if (!hashPassword) {
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

        return user;
    }
    register = async (): Promise<UserType> => {
        const user = await UserModel.findOne({ email: this.User.email });
        if (user) {
            throw {
                message: 'User not created.',
                status: 400,
                error: true,
            };
        }
        const salt = bcrypt.genSaltSync(this.saltRounds);

        const hashPassword = bcrypt.hashSync('cristian890789', salt);
        this.User.password = hashPassword;

        const userToCreate: UserType = {
            ...this.User,
            created: new Date(),
            updated: new Date(),
            deleted: null,
            active: true,
            userAttempts: 0,
            blocked: false,
            lastLogin: new Date(),
            blockedDate: null,
            attempsLogin: 0,
        };

        this.User = userToCreate;

        const newUser = new UserModel(this.User);
        return newUser.save();
    };
}
