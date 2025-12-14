import { AggregateRoot } from "@/_lib/DDD";
import { UserRoleId } from "./UserRoleId";
import { UserId } from "@/_sharedKernel/domain/UserId";
import { RoleId } from "@/role/domain/RoleId";
import { makeWithInvariants } from "@/_lib/WithInvariants";

namespace UserRole {
    type UserRole = AggregateRoot<UserRoleId, UserId> & Readonly<{
        userId: UserId;
        roleId: RoleId;
    }>;

    const withInvariants = makeWithInvariants<UserRole>((self, assert) => {
        assert(self.userId.value.length > 0);
        assert(self.roleId.value.length > 0);
    });

    type CreateUserRoleProps = {
        id: UserRoleId,
        userId: UserId,
        roleId: RoleId
    };

    export const create = withInvariants(
        (props: CreateUserRoleProps, createdBy?: UserId): UserRole => ({
            id: props.id,
            userId: props.userId,
            roleId: props.roleId,
            deleted: false,
            createdAt: new Date(),
            createdBy: createdBy,
            updatedAt: new Date(),
            updatedBy: createdBy,
            version: 0
        })
    );

    export const markAsDeleted = withInvariants(
        (self: UserRole, deletedBy?: UserId): UserRole => ({
            ...self,
            deleted: true,
            updatedAt: new Date(),
            updatedBy: deletedBy
        })
    );

    export type Type = UserRole;
}

export { UserRole };