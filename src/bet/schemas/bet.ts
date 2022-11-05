import { EntitySchema, types } from '@mikro-orm/core';
import Bet from '../core/domain/bet/Bet';
import { IEntity } from './entity';

interface IBet {
    id: Bet['id'];
    gameId: Bet['gameId'];
    amount: Bet['amount'];
    playerIds: Bet['playerIds'];
    winnerPlayerId: Bet['winnerPlayerId'];
    status: Bet['status'];
    version: number;
}

export default new EntitySchema<IBet, IEntity>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: Bet,
    extends: 'BettingEntity',
    properties: {
        version: { type: 'number', version: true },
        playerIds: { type: types.array },
        winnerPlayerId: { type: types.uuid, nullable: true },
        amount: { type: types.smallint },
        gameId: { type: types.uuid },
        status: {
            reference: 'embedded',
            entity: 'Status'
        }
    }
});
