import { ApplicationService } from "@/_lib/DDD";
import { UserRoleRepository } from "@/userRole/domain/UserRoleRepository";

type Dependencies = {
    userRoleRepository: UserRoleRepository;
};

type RemoveUserFromRolePayload = {
    userId: string;
    roleName: string;
}

type RemoveUserFromRole = ApplicationService<RemoveUserFromRolePayload, void>;

const makeRemoveUserFromRole = ({ userRoleRepository }: Dependencies): RemoveUserFromRole =>
    async ({ userId, roleName }) => {
        await userRoleRepository.removeUserFromRole(userId, roleName);
    };

export { makeRemoveUserFromRole };
export type { RemoveUserFromRole };