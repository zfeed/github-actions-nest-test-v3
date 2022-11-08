import { MikroORM } from '@mikro-orm/core';
import { TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/sqlite';
import MatchStartedEventHandler from '../../src/contexts/betting/core/handlers/MatchStartedEventHandler';
import MatchFinishedEventHandler from '../../src/contexts/betting/core/handlers/MatchFinishedEventHandler';
import Bet from '../../src/contexts/betting/core/domain/bet/Bet';
import Status from '../../src/contexts/betting/core/domain/bet/Status';
import MatchStartedEvent from '../../src/contexts/gaming/components/match/core/domain/events/MatchStartedEvent';
import MatchFinishedEvent from '../../src/contexts/gaming/components/match/core/domain/events/MatchFinishedEvent';
import * as database from '../database';

let moduleRef: TestingModule;

beforeAll(async () => {
    moduleRef = await database.createTestingModule(
        MatchStartedEventHandler,
        MatchFinishedEventHandler
    );
});

afterAll(async () => {
    const mikroorm = await moduleRef.resolve(MikroORM);
    await mikroorm.close();
});

beforeEach(async () => database.initialize());

describe('Bet', () => {
    test('Bet is created', async () => {
        const matchStartedEventHandler = await moduleRef.resolve(
            MatchStartedEventHandler
        );

        await matchStartedEventHandler.handle(
            new MatchStartedEvent(1, new Date(), 'match-id-1', [
                'player-id-1',
                'player-id-2'
            ])
        );

        const em = await moduleRef.resolve(EntityManager);
        const betRepository = em.getRepository(Bet);

        // assert database state
        const bets = await betRepository.findAll();
        expect(bets[0]!.id).toStrictEqual(expect.any(String));
        expect(bets[0]!.matchId).toBe('match-id-1');
        expect(bets[0]!.getWinnerPlayerId()).toBe(null);
        expect(bets[0]!.amount).toStrictEqual(0);
        expect(bets[0]!.getStatus()).toEqual(Status.create(Status.code.ACTIVE));
        expect(bets[0]!.playerIds).toEqual(['player-id-1', 'player-id-2']);
    });

    test('Bet is finished', async () => {
        const matchStartedEventHandler = await moduleRef.resolve(
            MatchStartedEventHandler
        );
        const matchFinishedEventHandler = await moduleRef.resolve(
            MatchFinishedEventHandler
        );

        await matchStartedEventHandler.handle(
            new MatchStartedEvent(1, new Date(), 'match-id-1', [
                'player-id-1',
                'player-id-2'
            ])
        );

        await matchFinishedEventHandler.handle(
            new MatchFinishedEvent(
                2,
                new Date(),
                'match-id-1',
                [
                    {
                        id: 'player-id-1',
                        score: 0
                    },
                    {
                        id: 'player-id-2',
                        score: 0
                    }
                ],
                new Date()
            )
        );

        const em = await moduleRef.resolve(EntityManager);
        const betRepository = em.getRepository(Bet);

        // assert database state
        const bets = await betRepository.findAll();
        expect(bets[0]!.id).toStrictEqual(expect.any(String));
        expect(bets[0]!.matchId).toBe('match-id-1');
        expect(bets[0]!.getWinnerPlayerId()).toBeOneOf([
            'player-id-1',
            'player-id-2'
        ]);
        expect(bets[0]!.getStatus()).toEqual(
            Status.create(Status.code.FINISHED)
        );
        expect(bets[0]!.playerIds).toEqual(['player-id-1', 'player-id-2']);
    });
});
