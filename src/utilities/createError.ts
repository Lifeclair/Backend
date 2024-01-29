import { ValidationError } from 'class-validator';

export const createError = (error: unknown) => {
    let response: { status: number; error: string | string[] } = {
        error: '',
        status: 0,
    };
    if (Array.isArray(error) && error[0] instanceof ValidationError) {
        response.status = 400;
        response.error = error.reduce((lastError, error) => {
            const { constraints } = error;
            const keys = Object.keys(constraints || {});
            lastError.push(...keys.map((key) => constraints[key]));
            return lastError;
        }, []);
    } else if (error instanceof Error) {
        console.log(error);
        response.status = 502;
        response.error = 'Oops, something went wrong';
    } else if (
        error !== null &&
        typeof error === 'object' &&
        'error' in error &&
        'message' in error &&
        (typeof error.message === 'string' || Array.isArray(error.message))
    ) {
        response.status = 400;
        response.error = error.message;
    } else {
        response.status = 500;
        response.error = 'Internal server error';
    }
    return response;
};
