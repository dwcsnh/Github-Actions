import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";
import { makeValidator } from "@/_lib/http/validation/Validator";
import { Gender } from "@/_sharedKernel/domain/types/User/User";
import { CreateUser } from "@/user/application/useCases/CreateUser"
import { Request, Response } from "express";
import Joi from "types-joi";

type Dependencies = {
    createUser: CreateUser;
};

const { getBody } = makeValidator({
    body: Joi.object({
        username: Joi.string().required(),
        familyName: Joi.string().required(),
        givenName: Joi.string().required(),
        gender: Joi.string().valid('MALE', 'FEMALE').required(),
        birthday: Joi.date().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }).required(),
});

const createUserHandler = handler(({ createUser }: Dependencies) => async (req: Request, res: Response) => {
    const {
        username,
        familyName,
        givenName,
        gender,
        birthday,
        email,
        password,
    } = getBody(req);

    const userId = await createUser({
        username,
        familyName,
        givenName,
        gender: gender as Gender,
        birthday,
        email,
        password
    });

    res.status(HttpStatus.CREATED).json({ id: userId });
});

export { createUserHandler };