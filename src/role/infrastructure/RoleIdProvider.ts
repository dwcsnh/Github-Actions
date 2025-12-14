import { makeIdProvider } from "@/_lib/IdProvider";
import { RoleId } from "../domain/RoleId";

const RoleIdProvider = makeIdProvider<RoleId>('RoleId');

export { RoleIdProvider };