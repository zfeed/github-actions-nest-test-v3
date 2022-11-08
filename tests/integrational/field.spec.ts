import { MikroORM } from '@mikro-orm/core';
import { TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/sqlite';
import FieldService from '../../src/contexts/game/components/field/core/services/FieldService';
import MatchStartedEventHandler from '../../src/contexts/game/components/field/core/handlers/MatchStartedEventHandler';
import MatchStartedEvent from '../../src/contexts/game/components/match/core/domain/events/MatchStartedEvent';
import Field from '../../src/contexts/game/components/field/core/domain/Field';
import * as database from '../database';

let moduleRef: TestingModule;

beforeAll(async () => {
    moduleRef = await database.createTestingModule(
        FieldService,
        MatchStartedEventHandler
    );
});

afterAll(async () => {
    const mikroorm = await moduleRef.resolve(MikroORM);
    await mikroorm.close();
});

beforeEach(async () => database.initialize());

describe('Field', () => {
    test('Field is created', async () => {
        const matchStartedEventHandler = await moduleRef.resolve(
            MatchStartedEventHandler
        );

        await matchStartedEventHandler.handle(
            new MatchStartedEvent(1, new Date(), '1', ['1', '2'])
        );

        const em = await moduleRef.resolve(EntityManager);
        const fieldRepository = em.getRepository(Field);

        // assert database state
        const fields = await fieldRepository.findAll();
        expect(fields).toHaveLength(1);
        expect(fields[0]!.id).toEqual(expect.any(String));
        expect(fields[0]!.getMarkedCellPosition()).toEqual(expect.any(Number));
        expect(fields[0]!.getPlayerIds()).toEqual(['1', '2']);
        expect(fields[0]!.getSession()).toEqual({
            minutesToPlay: 1,
            startedAt: expect.toBeDateString()
        });
    });

    test('Field is hit', async () => {
        const fieldService = await moduleRef.resolve(FieldService);
        const matchStartedEventHandler = await moduleRef.resolve(
            MatchStartedEventHandler
        );

        await matchStartedEventHandler.handle(
            new MatchStartedEvent(1, new Date(), '1', ['1', '2'])
        );

        const em = await moduleRef.resolve(EntityManager);
        const fieldRepository = em.getRepository(Field);

        const field = (await fieldRepository.findAll())[0] as Field;

        const result = await fieldService.hit(field.id, 0, '1');

        expect(result).toEqual({
            error: null,
            data: {
                field: {
                    id: field.id,
                    playerIds: ['1', '2'],
                    matchId: '1',
                    markedCellPosition: expect.any(Number),
                    size: expect.any(Number),
                    session: {
                        minutesToPlay: 1,
                        startedAt: expect.toBeDateString()
                    }
                }
            }
        });
    });

    test("Field's marked cell position is changed", async () => {
        const fieldService = await moduleRef.resolve(FieldService);
        const matchStartedEventHandler = await moduleRef.resolve(
            MatchStartedEventHandler
        );

        await matchStartedEventHandler.handle(
            new MatchStartedEvent(1, new Date(), '1', ['1', '2'])
        );

        const em = await moduleRef.resolve(EntityManager);
        const fieldRepository = em.getRepository(Field);

        const field = (await fieldRepository.findAll())[0] as Field;

        await fieldService.changeMarkedCellPosition(field.id);

        const fields = await fieldRepository.findAll();

        expect(fields).toHaveLength(1);
        expect(fields[0]!.id).toEqual(expect.any(String));
        expect(fields[0]!.getMarkedCellPosition()).toEqual(expect.any(Number));
        expect(fields[0]!.getPlayerIds()).toEqual(['1', '2']);
        expect(fields[0]!.getSession()).toEqual({
            minutesToPlay: 1,
            startedAt: expect.toBeDateString()
        });
    });
});
