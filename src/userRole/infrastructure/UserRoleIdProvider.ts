import { makeIdProvider } from "@/_lib/IdProvider";
import { UserRoleId } from "../domain/UserRoleId";

const UserRoleIdProvider = makeIdProvider<UserRoleId>('UserRoleIdProvider');

export { UserRoleIdProvider };