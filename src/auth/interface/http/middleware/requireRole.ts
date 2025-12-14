import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '@/_lib/errors/ForbiddenError';

type RequireRole = (req: Request, res: Response, next: NextFunction) => void;

const requireRole = (roleName: string | string[]): RequireRole => (req, res, next) => {
    // @ts-ignore
    const user = req.user;

    if (!user || !user.roles) {
        throw ForbiddenError.create('Access denied');
    }

    const requiredRoles = Array.isArray(roleName) ? roleName : [roleName];
    const hasRole = user.roles.some((role: string) => requiredRoles.includes(role));

    if (!hasRole) {
        throw ForbiddenError.create('Insufficient permissions');
    }

    next();
};

export { requireRole };
export type { RequireRole };
