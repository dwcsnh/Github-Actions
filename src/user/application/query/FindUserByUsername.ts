import { Query, QueryHandler, QueryResult } from "@/_lib/CQRS";
import { AggregateRootDTO } from "@/_lib/DDD";
import { User } from "@/user/domain/User";
import { UserRepository } from "@/user/domain/UserRepository";
import { UserMapper } from "@/user/infrastructure/UserMapper";

type Dependencies = {
    userRepository: UserRepository
};

type UserDTO = AggregateRootDTO<User.Type>;

type UserFilter = {
    username: string
};

type FindUserByUsername = QueryHandler<Query<UserFilter>, QueryResult<UserDTO>>;

const makeFindUserByUsername =
    ({ userRepository }: Dependencies): FindUserByUsername =>
        async ({ filter }) => {
            let user = await userRepository.findByUsername(filter.username);

            return { data: UserMapper.toDTO(user) };
        }

export { makeFindUserByUsername };
export type { FindUserByUsername };