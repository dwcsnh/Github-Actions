import { AggregateRootDTO, DataMapper } from "@/_lib/DDD";
import { User } from "../domain/User";
import { UserSchema } from "./UserCollection";
import { from } from "uuid-mongodb";
import { UserIdProvider } from "@/_sharedKernel/infrastructure/UserIdProvider";

const UserMapper: DataMapper<User.Type, UserSchema, AggregateRootDTO<User.Type>> = {
    toData: (entity: User.Type) => ({
        _id: from(entity.id.value),
        username: entity.username,
        familyName: entity.familyName,
        givenName: entity.givenName,
        gender: entity.gender,
        birthday: entity.birthday,
        email: entity.email,
        password: entity.password,
        createdAt: entity.createdAt,
        createdBy: entity.createdBy ? from(entity.createdBy.value) : undefined,
        updatedAt: entity.updatedAt,
        updatedBy: entity.updatedBy ? from(entity.updatedBy.value) : undefined,
        deleted: entity.deleted,
        version: entity.version
    }),

    toEntity: (data: UserSchema) => ({
        id: UserIdProvider.create(from(data._id).toString()),
        username: data.username,
        familyName: data.familyName,
        givenName: data.givenName,
        gender: data.gender,
        birthday: data.birthday,
        email: data.email,
        password: data.password,
        createdAt: data.createdAt,
        createdBy: data.createdBy ? UserIdProvider.create(from(data.createdBy).toString()) : undefined,
        updatedAt: data.updatedAt,
        updatedBy: data.updatedBy ? UserIdProvider.create(from(data.updatedBy).toString()) : undefined,
        deleted: data.deleted,
        version: data.version,
    }),

    toDTO: (entity: User.Type) => ({
        id: entity.id,
        username: entity.username,
        familyName: entity.familyName,
        givenName: entity.givenName,
        gender: entity.gender,
        birthday: entity.birthday,
        email: entity.email,
        password: entity.password,
    })
};

export { UserMapper };