import { User } from "@/user/domain/User";
import { Event } from "@/_lib/events/Event";
import { v4 } from "uuid-mongodb";

namespace UserAddedToRoleEvent {
    export const topic = 'User' as const;
    export const eventType = 'UserAddedToRoleEvent' as const;

    type UserAddedToRoleEvent = Event<User.Type, typeof eventType, typeof topic>;

    export const create = (user: User.Type): UserAddedToRoleEvent => ({
        eventId: v4().toString(),
        eventType,
        topic,
        payload: user,
    });

    export type Type = UserAddedToRoleEvent;
}

export { UserAddedToRoleEvent };