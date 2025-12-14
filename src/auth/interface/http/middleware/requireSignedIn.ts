import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '@/_lib/errors/UnauthorizedError';

type RequireSignedIn = (req: Request, res: Response, next: NextFunction) => void;

const requireSignedIn = (): RequireSignedIn => (req, res, next) => {
    // @ts-ignore
    if (!req.user) {
        throw UnauthorizedError.create('No token provided');
    }

    next();
};

export { requireSignedIn };
export type { RequireSignedIn };
