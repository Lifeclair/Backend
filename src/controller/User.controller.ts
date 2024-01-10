import type { Request, Response } from 'express';
import { UserService } from '@/services';
import { ResponseApi } from '@/models';
import { UserType } from '@/Schemas';
import { createError } from '@/utilities';

export class UserController {
    private User: typeof UserService = UserService;

    public getUserLogin = async (req: Request, res: Response) => {
        let status = 200;

        const response: ResponseApi<string | string[] | UserType> = {
            error: false,
            data: '',
        };
        const body = req.body;
        const email = body?.email;
        const password = body?.password;

        try {
            const User = new this.User({ email, password });
            const user = await User.Login();
            response.data = user;
        } catch (error) {
            const result = createError(error);
            response.error = true;
            response.data = result.error;
            status = result.status;
        }

        return res.status(status).json(response);
    };

    register = async (req: Request, res: Response) => {
        let status = 200;

        const response: ResponseApi<string | string[] | UserType> = {
            error: false,
            data: '',
        };
        const body = req.body;
        const email = body?.email;
        const password = body?.password;

        try {
            const User = new this.User({ email, password });
            const user = await User.register();
            if (user) {
                response.data = 'User created successfully';
            } else {
                response.data = 'User not created';
            }
        } catch (error) {
            const result = createError(error);
            response.error = true;
            response.data = result.error;
            status = result.status;
        }

        return res.status(status).json(response);
    };
}

/**
 * import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cambioContraseñaId: { type: String, default: 'valor-unico-inicial' },
});

// Middleware de Mongoose para antes de guardar el usuario
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Si la contraseña ha sido modificada, hashearla antes de guardar
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    // Actualizar el identificador único asociado a la contraseña
    this.cambioContraseñaId = mongoose.Types.ObjectId().toString();
  }
  next();
});

const Usuario = mongoose.model('Usuario', userSchema);

export default Usuario;

 */
