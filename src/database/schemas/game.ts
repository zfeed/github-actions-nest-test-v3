import { EntitySchema, types } from '@mikro-orm/core';
import Game from '../../core/domain/game/Game';
import { IEntity } from './entity';

interface IGame {
    players: Game['players'];
    session: Game['session'];
    maxPlayers: Game['maxPlayers'];
}

export default new EntitySchema<IGame, IEntity>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: Game,
    extends: 'Entity',
    properties: {
        players: { reference: 'embedded', entity: 'Player', array: true },
        maxPlayers: { type: types.smallint, unsigned: true },
        session: {
            reference: 'embedded',
            entity: 'Session',
            nullable: true
        }
    }
});
