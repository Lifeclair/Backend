import { validate } from 'class-validator';

export class GeneralService {
    async transformValidatorErrors(validation: any) {
        const errors = await validate(validation);
        const erroresMapped: { field: string; message: unknown }[] = [];
        if (errors && errors.length > 0) {
            errors.map((error: any) => {
                erroresMapped.push({
                    field: error.property,
                    message: Object.values(error.constraints)[0],
                });
            });
        }
        if (erroresMapped.length > 0) {
            throw {
                message: erroresMapped,
                status: 400,
                error: true,
            };
        }
    }
}
