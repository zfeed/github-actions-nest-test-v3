import { EntitySchema, types } from '@mikro-orm/core';
import { Entity } from '../../../packages/domain';

export interface IEntity {
    id: Entity<never>['id'];
}

export const entity = new EntitySchema<IEntity>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: Entity,
    abstract: true,
    properties: {
        id: { type: types.uuid, primary: true }
    }
});
