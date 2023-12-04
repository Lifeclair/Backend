const createError = (error: unknown) => {
    let response: { status: number; error: string | string[] } = {
        error: '',
        status: 0,
    };
    if (error instanceof Error) {
        response.status = 502;
        response.error = error?.message;
    } else if (
        typeof error === 'object' &&
        'error' in error &&
        'message' in error &&
        typeof error.message === 'string'
    ) {
        response.status = 400;
        response.error = error.message;
    } else {
        response.status = 500;
        response.error = 'Internal server error';
    }
    return response;
};
