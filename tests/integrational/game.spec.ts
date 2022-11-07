import { MikroORM } from '@mikro-orm/core';
import { TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/sqlite';
import GameService from '../../src/game/components/game/core/services/GameService';
import Game from '../../src/game/components/game/core/domain/Game';
import * as database from '../database';

let moduleRef: TestingModule;

beforeAll(async () => {
    moduleRef = await database.createTestingModule(GameService);
});

afterAll(async () => {
    const mikroorm = await moduleRef.resolve(MikroORM);
    await mikroorm.close();
});

beforeEach(() => database.initialize());

describe('Game', () => {
    test('Game is created', async () => {
        const gameService = await moduleRef.resolve(GameService);

        const result = await gameService.create('John');
        console.log(result);

        // assert service response
        expect(result).toEqual({
            data: {
                game: {
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
        const gameRepository = em.getRepository(Game);

        // assert database state
        const games = await gameRepository.findAll();
        expect(games).toHaveLength(1);
        expect(games[0]?.getPlayers()).toHaveLength(1);
        expect(games[0]?.getPlayers()).toEqual(
            expect.arrayContaining([
                {
                    id: expect.any(String),
                    name: 'John',
                    score: expect.any(Number)
                }
            ])
        );
    });

    test('Game is joined by the last player', async () => {
        const gameService = await moduleRef.resolve(GameService);
        const created = await gameService.create('John');

        // assert join result
        const result = await gameService.join('Mike', created.data.game.id);
        expect(result).toEqual({
            data: {
                game: {
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
        const gameRepository = em.getRepository(Game);

        // assert database state
        const games = await gameRepository.findAll();
        expect(games).toHaveLength(1);
        expect(games[0]?.getPlayers()).toHaveLength(2);
        expect(games[0]?.getPlayers()).toEqual([
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
