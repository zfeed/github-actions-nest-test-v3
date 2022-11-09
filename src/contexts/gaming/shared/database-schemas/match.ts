import { EntitySchema, types } from '@mikro-orm/core';
import { Match } from '../../components/match/core/domain';
import { IEntity } from './entity';

interface IMatch {
    players: Match['players'];
    session: Match['session'];
    maxPlayers: Match['maxPlayers'];
    version: number;
    finishedAt: Match['finishedAt'];
}

export const matchSchema = new EntitySchema<IMatch, IEntity>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: Match,
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
