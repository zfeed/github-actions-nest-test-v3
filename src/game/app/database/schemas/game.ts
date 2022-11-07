import { EntitySchema, types } from '@mikro-orm/core';
import Game from '../../../core/domain/game/Game';
import { IEntity } from './entity';

interface IGame {
    players: Game['players'];
    session: Game['session'];
    maxPlayers: Game['maxPlayers'];
    version: number;
    finishedAt: Game['finishedAt'];
}

export default new EntitySchema<IGame, IEntity>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: Game,
    extends: 'Entity',
    properties: {
        version: { type: 'number', version: true },
        players: { reference: 'embedded', entity: 'Player', array: true },
        maxPlayers: { type: types.smallint, unsigned: true },
        finishedAt: { type: types.datetime, nullable: true },
        session: {
            reference: 'embedded',
            entity: 'Session',
            nullable: true
        }
    }
});
