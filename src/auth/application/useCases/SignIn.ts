import { ApplicationService } from "@/_lib/DDD";
import { UserRepository } from "@/user/domain/UserRepository";
import { UserRoleRepository } from "@/userRole/domain/UserRoleRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type Dependencies = {
    userRepository: UserRepository;
    userRoleRepository: UserRoleRepository;
};

type SignInPayload = {
    username: string;
    password: string;
};

type SignInResponse = {
    token: string;
};

type SignIn = ApplicationService<SignInPayload, SignInResponse>;

const makeSignIn = ({ userRepository, userRoleRepository }: Dependencies): SignIn =>
    async ({ username, password }) => {
        try {
            const user = await userRepository.findByUsername(username);
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }

            const roles = await userRoleRepository.getUserRoles(user.id.value);

            const token = jwt.sign(
                { id: user.id.value, username: user.username, roles },
                process.env.JWT_SECRET || 'default_secret',
                { expiresIn: '1h' }
            );

            return { token };
        } catch (error) {
            throw new Error('Error fetching roles');
        }
    };

export { makeSignIn };
export type { SignIn };
