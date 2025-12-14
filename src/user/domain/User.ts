import { AggregateRoot } from "@/_lib/DDD";
import { makeWithInvariants } from "@/_lib/WithInvariants";
import { UserId } from "@/_sharedKernel/domain/UserId";

namespace User {
    type Gender = 'MALE' | 'FEMALE';

    type User = AggregateRoot<UserId, UserId> & Readonly<{
        username: string;
        familyName: string;
        givenName: string;
        gender: Gender;
        birthday: Date;
        email: string;
        password: string;
    }>;

    const withInvariants = makeWithInvariants<User>((self, assert) => {
        assert(self.username?.length > 0);
        assert(self.familyName?.length > 0);
        assert(self.givenName?.length > 0);
        assert(self.email?.match(/^.{3,}@.{4,}\.com$/));
        assert(self.password?.length > 8);
        assert(['MALE', 'FEMALE'].includes(self.gender))
    });

    type CreateUserProps = Readonly<{
        id: UserId;
        username: string;
        familyName: string;
        givenName: string;
        gender: Gender;
        birthday: Date;
        email: string;
        password: string;
    }>;

    type UpdateUserProps = Partial<Omit<CreateUserProps, 'id'>>;

    export const create = withInvariants(
        (props: CreateUserProps, createdBy?: UserId): User => ({
            id: props.id,
            username: props.username,
            familyName: props.familyName,
            givenName: props.givenName,
            gender: props.gender,
            birthday: props.birthday,
            email: props.email,
            password: props.password,
            deleted: false,
            createdAt: new Date(),
            createdBy: createdBy,
            updatedAt: new Date(),
            updatedBy: createdBy,
            version: 0
        })
    );

    export const update = withInvariants(
        (self: User, props: UpdateUserProps, updatedBy?: UserId): User => ({
            id: self.id,
            username: props.username ?? self.username,
            familyName: props.familyName ?? self.familyName,
            givenName: props.givenName ?? self.givenName,
            gender: props.gender ?? self.gender,
            birthday: props.birthday ?? self.birthday,
            email: props.email ?? self.email,
            password: props.password ?? self.password,
            deleted: false,
            createdAt: self.createdAt,
            createdBy: self.createdBy,
            updatedAt: new Date(),
            updatedBy: updatedBy,
            version: self.version + 1
        })
    );

    export const markAsDeleted = withInvariants(
        (self: User, deletedBy?: UserId): User => ({
            ...self,
            deleted: true,
            updatedAt: new Date(),
            updatedBy: deletedBy
        })
    );

    export type Type = User
}

export { User };