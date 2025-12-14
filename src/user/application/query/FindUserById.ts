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
    id: string
};

type FindUserById = QueryHandler<Query<UserFilter>, QueryResult<UserDTO>>;

const makeFindUserById =
    ({ userRepository }: Dependencies): FindUserById =>
        async ({ filter }) => {
            let user = await userRepository.findById(filter.id);

            return { data: UserMapper.toDTO(user) };
        };

export { makeFindUserById };
export type { FindUserById };
