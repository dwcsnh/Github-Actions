import { ApplicationService } from "@/_lib/DDD";
import { UnauthorizedError } from "@/_lib/errors/UnauthorizedError";
import { Gender } from "@/_sharedKernel/domain/types/User/User";
import { User } from "@/user/domain/User";
import { UserRepository } from "@/user/domain/UserRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type Dependencies = {
    userRepository: UserRepository;
};

type SignUpPayload = {
    username: string;
    familyName: string;
    givenName: string;
    gender: Gender;
    birthday: Date;
    email: string;
    password: string;
};

type SignUpResponse = {
    token: string;
};

type SignUp = ApplicationService<SignUpPayload, SignUpResponse>;

const makeSignUp = ({ userRepository }: Dependencies): SignUp =>
    async ({ username, familyName, givenName, gender, birthday, email, password }) => {
        try {
            const id = await userRepository.getNextId();
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = User.create({
                id,
                username,
                familyName,
                givenName,
                gender,
                birthday,
                email,
                password: hashedPassword
            });
            await userRepository.store(user);

            const token = jwt.sign(
                { id: user.id.value, username: user.username, roles: [] },
                process.env.JWT_SECRET || 'default_secret',
                { expiresIn: '1h' }
            );

            return { token };
        } catch (error) {
            throw UnauthorizedError.create('Invalid credentials');
        }
    };

export { makeSignUp };
export type { SignUp };
