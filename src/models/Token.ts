export interface TokenPayload {
    passwordID: string | null | undefined;
    sub: string;
    iat: number;
    exp: number;
}
