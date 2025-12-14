import { ApplicationService } from "@/_lib/DDD";
import { User } from "@/user/domain/User";
import { UserRepository } from "@/user/domain/UserRepository"

type Dependencies = {
    userRepository: UserRepository
};

type DeleteUser = ApplicationService<string, void>;

const makeDeleteUser =
    ({ userRepository }: Dependencies): DeleteUser =>
        async (payload: string) => {
            let user = await userRepository.findById(payload);

            user = User.markAsDeleted(user);

            userRepository.store(user);
        }

export { makeDeleteUser }
export type { DeleteUser }