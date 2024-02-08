export interface ResponseApi<T> {
    error: boolean;
    data: T | string | string[];
    status: number;
}
