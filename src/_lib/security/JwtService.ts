import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';

export type JwtPayload = Record<string, any>;

export class JwtService {
    constructor(private readonly secret: string) { }

    sign(payload: JwtPayload, options?: SignOptions): string {
        return jwt.sign(payload, this.secret, options);
    }

    verify<T = JwtPayload>(token: string, options?: VerifyOptions): T {
        return jwt.verify(token, this.secret, options) as T;
    }
}
