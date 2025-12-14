import { handler } from "@/_lib/http/handler";
import { FindUserById } from "@/user/application/query/FindUserById"
import { Request, Response } from "express";

type Dependencies = {
    findUserById: FindUserById;
};

const findUserByIdHandler = handler(({ findUserById }: Dependencies) => async (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = findUserById({ filter: { id: userId } });

    res.json(user);
});

export { findUserByIdHandler };