import { ApplicationService } from "@/_lib/DDD";
import { UserRoleRepository } from "@/userRole/domain/UserRoleRepository";

type Dependencies = {
    userRoleRepository: UserRoleRepository;
};

type AddUserToRolePayload = {
    userId: string;
    roleName: string;
}

type AddUserToRole = ApplicationService<AddUserToRolePayload, void>;

const makeAddUserToRole = ({ userRoleRepository }: Dependencies): AddUserToRole =>
    async ({ userId, roleName }) => {
        await userRoleRepository.addUserToRole(userId, roleName);
    };

export { makeAddUserToRole };
export type { AddUserToRole };
