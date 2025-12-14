import { AggregateRoot } from "@/_lib/DDD";
import { RoleId } from "./RoleId";
import { UserId } from "@/_sharedKernel/domain/UserId";
import { makeWithInvariants } from "@/_lib/WithInvariants";

namespace Role {
    type Role = AggregateRoot<RoleId, UserId> & Readonly<{
        name: string;
    }>;

    const withInvariants = makeWithInvariants<Role>((self, assert) => {
        assert(self.name.length > 0);
    });

    type CreateRoleProps = Readonly<{
        id: RoleId;
        name: string;
    }>;

    export const create = withInvariants(
        (props: CreateRoleProps, createdBy?: UserId): Role => ({
            id: props.id,
            name: props.name,
            deleted: false,
            createdAt: new Date(),
            createdBy: createdBy,
            updatedAt: new Date(),
            updatedBy: createdBy,
            version: 0
        })
    );

    export const markAsDeleted = withInvariants(
        (self: Role, deletedBy?: UserId): Role => ({
            ...self,
            deleted: true,
            updatedAt: new Date(),
            updatedBy: deletedBy
        })
    );

    export type Type = Role;
}

export { Role };