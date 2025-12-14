import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { UnauthorizedError } from "@/_lib/errors/UnauthorizedError";

const jwtMiddleware = (): RequestHandler => (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
            // @ts-ignore
            req.user = decoded;
            next();
        } catch (error) {
            throw UnauthorizedError.create('Invalid token');
        }
    } else {
        next();
    }
};

export { jwtMiddleware };


