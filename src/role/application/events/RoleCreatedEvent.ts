import { Event } from "@/_lib/events/Event";
import { Role } from "@/role/domain/Role";
import { v4 } from "uuid-mongodb";

namespace RoleCreatedEvent {
    export const topic = 'Role' as const;
    export const eventType = 'RoleCreatedEvent' as const;

    type RoleCreatedEvent = Event<Role.Type, typeof eventType, typeof topic>;

    export const create = (role: Role.Type): RoleCreatedEvent => ({
        eventId: v4().toString(),
        eventType,
        topic,
        payload: role,
    });

    export type Type = RoleCreatedEvent;
}

export { RoleCreatedEvent };