import { ApplicationService } from "@/_lib/DDD";
import { eventProvider } from "@/_lib/pubSub/EventEmitterProvider";
import { Gender } from "@/_sharedKernel/domain/types/User/User";
import { User } from "@/user/domain/User";
import { UserRepository } from "@/user/domain/UserRepository"
import { UserCreatedEvent } from "../events/UserCreatedEvent";
import bcrypt from "bcrypt";

type Dependencies = {
    userRepository: UserRepository
};

type CreateUserPayload = {
    username: string;
    familyName: string;
    givenName: string;
    gender: Gender;
    birthday: Date;
    email: string;
    password: string;
};

type CreateUser = ApplicationService<CreateUserPayload, string>;

const makeCreateUser = eventProvider<Dependencies, CreateUser>(
    ({ userRepository }, enqueue) =>
        async (payload: CreateUserPayload) => {
            const id = await userRepository.getNextId();

            const hashedPassword = await bcrypt.hash(payload.password, 10);

            const user = User.create({
                id,
                username: payload.username,
                familyName: payload.familyName,
                givenName: payload.givenName,
                gender: payload.gender,
                birthday: payload.birthday,
                email: payload.email,
                password: hashedPassword
            });

            await userRepository.store(user);

            enqueue(UserCreatedEvent.create(user));

            return id.value;
        }
);

export { makeCreateUser };
export type { CreateUser };