import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";
import { makeValidator } from "@/_lib/http/validation/Validator";
import { AddUserToRole } from "@/userRole/application/useCases/AddUserToRole";
import Joi from "types-joi";

type Dependencies = {
    addUserToRole: AddUserToRole;
};

const { getBody } = makeValidator({
    body: Joi.object({
        userId: Joi.string().required(),
        roleName: Joi.string().required(),
    }).required(),
});

const addUserToRoleHandler = handler(({ addUserToRole }: Dependencies) => async (req, res) => {
    const { userId, roleName } = getBody(req);

    await addUserToRole({ userId, roleName });

    res.status(HttpStatus.CREATED).json({ message: `User ${userId} added to role ${roleName}` });
});

export { addUserToRoleHandler };    