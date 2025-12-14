import { Event } from "@/_lib/events/Event";
import { User } from "@/user/domain/User";
import { v4 } from "uuid-mongodb";

namespace UserCreatedEvent {
    export const topic = 'User' as const;
    export const eventType = 'UserCreatedEvent' as const;

    type UserCreatedEvent = Event<User.Type, typeof eventType, typeof topic>;

    export const create = (user: User.Type): UserCreatedEvent => ({
        eventId: v4().toString(),
        eventType,
        topic,
        payload: user,
    });

    export type Type = UserCreatedEvent;
}

export { UserCreatedEvent };