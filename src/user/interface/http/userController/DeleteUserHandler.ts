import { handler } from "@/_lib/http/handler";
import { DeleteUser } from "@/user/application/useCases/DeleteUser"
import { Request, Response } from "express";

type Dependencies = {
    deleteUser: DeleteUser;
};

const deleteUserHandler = handler(({ deleteUser }: Dependencies) => async (req: Request, res: Response) => {
    const { userId } = req.params;

    await deleteUser(userId);

    res.sendStatus(204);
});

export { deleteUserHandler };