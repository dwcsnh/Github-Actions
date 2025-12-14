import { Query, QueryHandler, QueryResult } from "@/_lib/CQRS";
import { UserRoleRepository } from "@/userRole/domain/UserRoleRepository";

type Dependencies = {
    userRoleRepository: UserRoleRepository;
};

type UserRoleFilter = {
    userId: string;
};

type GetUserRoles = QueryHandler<Query<UserRoleFilter>, QueryResult<string[]>>;

const makeGetUserRoles = ({ userRoleRepository }: Dependencies): GetUserRoles =>
    async ({ filter }) => {
        const roles = await userRoleRepository.getUserRoles(filter.userId);
        return { data: roles };
    };

export { makeGetUserRoles };
export type { GetUserRoles }