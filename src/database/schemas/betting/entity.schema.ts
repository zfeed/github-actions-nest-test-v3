import { EntitySchema, types } from '@mikro-orm/core';
import { Event, Entity } from '../../../packages/domain';

class BettingEntity<E extends Event> extends Entity<E> {}

export interface IEntity {
    id: BettingEntity<never>['id'];
}

export const entitySchema = new EntitySchema<IEntity>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: BettingEntity,
    abstract: true,
    properties: {
        id: { type: types.uuid, primary: true }
    }
});
