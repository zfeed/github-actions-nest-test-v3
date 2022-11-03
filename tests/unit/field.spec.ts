import * as dayjs from 'dayjs';

import Field from '../../src/game/core/domain/field/Field';
import MarkedCellHitEvent from '../../src/game/core/domain/field/MarkedCellHitEvent';
import FieldMarkedCellPositionChanged from '../../src/game/core/domain/field/FieldMarkedCellPositionChanged';
import Session from '../../src/game/core/domain/common/Session';

describe('Field', () => {
    test('Field is created', () => {
        const now = new Date();
        const field = Field.create(
            '1',
            ['2', '3'],
            '4',
            16,
            Session.create(1, now)
        );

        expect(field.id).toBe('1');
        expect(field.getPlayerIds()).toEqual(['2', '3']);
        expect(field.getGameId()).toBe('4');
        expect(field.getSession()).toEqual(Session.create(1, now));
        expect(field.getSize()).toBe(16);
        expect(field.getMarkedCellPosition()).toBeGreaterThanOrEqual(1);
        expect(field.getMarkedCellPosition()).toBeLessThanOrEqual(16);
    });

    test("Field's marked cell is hit", () => {
        const field = Field.create(
            '1',
            ['2', '3'],
            '4',
            16,
            Session.create(1, new Date())
        );
        const markedCellPosition = field.getMarkedCellPosition();

        field.hit(markedCellPosition, '2', new Date());

        expect(field.events).toEqual([
            new MarkedCellHitEvent('2', '4', markedCellPosition)
        ]);
        expect(field.getMarkedCellPosition()).not.toBe(markedCellPosition);
        expect(field.getMarkedCellPosition()).toBeGreaterThanOrEqual(1);
        expect(field.getMarkedCellPosition()).toBeLessThanOrEqual(16);
    });

    test("Field's marked cell is hit by player that doesn't exit", () => {
        const field = Field.create(
            '1',
            ['2', '3'],
            '4',
            16,
            Session.create(1, new Date())
        );

        expect(() => field.hit(3, '4', new Date())).toThrow();
    });

    test("Field's marked cell position changed", () => {
        const field = Field.create(
            '1',
            ['2', '3'],
            '4',
            16,
            Session.create(1, new Date())
        );
        const previousMarkedCellPosition = field.getMarkedCellPosition();

        field.changeMarkedCellPosition(new Date());

        const currentMarkedCellPosition = field.getMarkedCellPosition();

        expect(field.events).toEqual([
            new FieldMarkedCellPositionChanged(
                currentMarkedCellPosition,
                '4',
                '1'
            )
        ]);
        expect(currentMarkedCellPosition).not.toBe(previousMarkedCellPosition);
        expect(field.getMarkedCellPosition()).toBeGreaterThanOrEqual(1);
        expect(field.getMarkedCellPosition()).toBeLessThanOrEqual(16);
    });

    test("Field can't be hit when session is over", () => {
        const field = Field.create(
            '1',
            ['2', '3'],
            '4',
            16,
            Session.create(1, new Date())
        );

        expect(() =>
            field.hit(1, '2', dayjs().add(2, 'minutes').toDate())
        ).toThrow();
    });

    test("Field's marked cell position can't be changed when session is over", () => {
        const field = Field.create(
            '1',
            ['2', '3'],
            '4',
            16,
            Session.create(1, new Date())
        );

        expect(() =>
            field.changeMarkedCellPosition(dayjs().add(2, 'minutes').toDate())
        ).toThrow();
    });
});
