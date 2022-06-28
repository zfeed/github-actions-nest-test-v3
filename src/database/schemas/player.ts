import { EntitySchema, types } from '@mikro-orm/core';
import Player from '../../core/domain/Player';
import { IEntity } from './entity';

interface IPlayer {
    name: Player['name'];
    score: Player['score'];
}

export default new EntitySchema<IPlayer, IEntity>({
    // TODO: find a way to get rid of ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: Player,
    extends: 'Entity',
    embeddable: true,
    properties: {
        name: { type: types.text, length: 100 },
        score: { type: types.smallint, unsigned: true }
    }
});
