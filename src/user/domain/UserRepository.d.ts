import { Repository } from "@/_lib/DDD";
import { User } from "./User";
import { UserId } from "@/_sharedKernel/domain/UserId";

type UserRepository = Repository<User.Type, UserId> & {
    findByUsername(username: string): Promise<User.Type>;
};

export { UserRepository };