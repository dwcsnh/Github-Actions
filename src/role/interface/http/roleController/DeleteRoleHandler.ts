import { handler } from "@/_lib/http/handler";
import { DeleteRole } from "@/role/application/useCases/DeleteRole"

type Dependencies = {
    deleteRole: DeleteRole;
};

const deleteRoleHandler = handler(({ deleteRole }: Dependencies) => async (req, res) => {
    const { roleId } = req.params;

    await deleteRole(roleId);

    res.sendStatus(204);
});

export { deleteRoleHandler };