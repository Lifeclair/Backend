import { ValidateNested } from 'class-validator';
import { UserModel, UserType } from '../Schemas/User.schema';
export class UserService {
    @ValidateNested()
    User: UserType;

    constructor(User: UserType) {
        this.User = User;
    }

    public async getUserLogin(): Promise<UserType> {
        const user = await UserModel.findOne({ email: this.User.email });
        if (!user) {
            throw {
                message: 'User or password incorrect',
                status: 404,
                error: true,
            };
        }
        if (user.password !== this.User.password) {
            throw {
                message: 'User or password incorrect',
                status: 400,
                error: true,
            };
        }

        return user;
    }
}
