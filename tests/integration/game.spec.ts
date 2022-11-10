import { MikroORM } from '@mikro-orm/core';
import { TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/sqlite';
import { MatchService } from '../../src/contexts/gaming/components/match/core/services';
import { Match } from '../../src/contexts/gaming/components/match/core/domain';
import * as database from '../database';

let moduleRef: TestingModule;

beforeAll(async () => {
    moduleRef = await database.createTestingModule(MatchService);
});

afterAll(async () => {
    const mikroorm = await moduleRef.resolve(MikroORM);
    await mikroorm.close();
});

beforeEach(() => database.initialize());

describe('Match', () => {
    test('Match is created', async () => {
        const matchService = await moduleRef.resolve(MatchService);

        const result = await matchService.create('John');

        // assert service response
        expect(result).toEqual({
            data: {
                match: {
                    id: expect.any(String),
                    maxPlayers: expect.any(Number),
                    players: [
                        {
                            id: expect.any(String),
                            name: 'John',
                            score: expect.any(Number)
                        }
                    ],
                    finishedAt: null
                }
            },
            error: null
        });

        const em = await moduleRef.resolve(EntityManager);
        const matchRepository = em.getRepository(Match);

        // assert database state
        const matches = await matchRepository.findAll();
        expect(matches).toHaveLength(1);
        expect(matches[0]?.getPlayers()).toHaveLength(1);
        expect(matches[0]?.getPlayers()).toEqual(
            expect.arrayContaining([
                {
                    id: expect.any(String),
                    name: 'John',
                    score: expect.any(Number)
                }
            ])
        );
    });

    test('Match is joined by the last player', async () => {
        const matchService = await moduleRef.resolve(MatchService);
        const created = await matchService.create('John');

        // assert join result
        const result = await matchService.join('Mike', created.data.match.id);
        expect(result).toEqual({
            data: {
                match: {
                    id: expect.any(String),
                    session: {
                        minutesToPlay: expect.any(Number),
                        startedAt: expect.toBeDateString()
                    },
                    maxPlayers: expect.any(Number),
                    players: [
                        {
                            id: expect.any(String),
                            name: 'John',
                            score: expect.any(Number)
                        },
                        {
                            id: expect.any(String),
                            name: 'Mike',
                            score: expect.any(Number)
                        }
                    ],
                    finishedAt: null
                },
                player: {
                    id: expect.any(String),
                    name: 'Mike',
                    score: expect.any(Number)
                }
            },
            error: null
        });

        const em = await moduleRef.resolve(EntityManager);
        const matchRepository = em.getRepository(Match);

        // assert database state
        const matches = await matchRepository.findAll();
        expect(matches).toHaveLength(1);
        expect(matches[0]?.getPlayers()).toHaveLength(2);
        expect(matches[0]?.getPlayers()).toEqual([
            {
                id: expect.any(String),
                name: 'John',
                score: expect.any(Number)
            },
            {
                id: expect.any(String),
                name: 'Mike',
                score: expect.any(Number)
            }
        ]);
    });
});
