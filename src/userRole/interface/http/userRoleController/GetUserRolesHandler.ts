import { GetUserRoles } from "@/userRole/application/query/GetUserRoles";
import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";

type Dependencies = {
    getUserRoles: GetUserRoles;
};


const getUserRolesHandler = handler(({ getUserRoles }: Dependencies) => async (req, res) => {
    const { userId } = req.params;

    const userRoles = await getUserRoles({ filter: { userId } });

    res.status(HttpStatus.OK).json(userRoles);
});

export { getUserRolesHandler };
