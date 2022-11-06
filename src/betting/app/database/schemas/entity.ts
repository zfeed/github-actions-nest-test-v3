import { EntitySchema, types } from '@mikro-orm/core';
import BettingEntity from '../../../core/domain/Entity';

export interface IEntity {
    id: BettingEntity<never>['id'];
}

export default new EntitySchema<IEntity>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: BettingEntity,
    abstract: true,
    properties: {
        id: { type: types.uuid, primary: true }
    }
});
