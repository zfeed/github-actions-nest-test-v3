import * as dayjs from 'dayjs';

import Game from '../../src/game/core/domain/game/Game';
import Player from '../../src/game/core/domain/game/Player';
import GameStartedEvent from '../../src/game/core/domain/game/GameStartedEvent';
import GameFinishedEvent from '../../src/game/core/domain/game/GameFinishedEvent';
import Session from '../../src/game/core/domain/common/Session';
import { MINUTES_TO_PLAY } from '../../src/game/core/constants';

describe('Game', () => {
    test('Game is created', () => {
        const game = Game.create('1', Player.create('1', 'playerName'), 2);

        expect(game.getSession()).toBe(undefined);
        expect(game.getPlayers()).toEqual([Player.create('1', 'playerName')]);
        expect(game.id).toBe('1');
        expect(game.getMaxPlayers()).toBe(2);
    });

    test('Player joined a game the second time', () => {
        const game = Game.create('1', Player.create('1', 'Mike'), 2);

        expect(() =>
            game.join(Player.create('1', 'Mike'), new Date())
        ).toThrow();
    });

    test('All players joined', () => {
        const now = new Date();
        const game = Game.create('game123', Player.create('1', 'John'), 2);

        game.join(Player.create('2', 'Mike'), now);

        expect(game.getSession()).toEqual(Session.create(1, now));
        expect(game.getPlayers()).toEqual([
            Player.create('1', 'John'),
            Player.create('2', 'Mike')
        ]);
        expect(game.events).toEqual([
            new GameStartedEvent(1, now, 'game123', ['1', '2'])
        ]);
    });

    test('Max number of players reached', () => {
        const now = new Date();
        const game = Game.create('game123', Player.create('1', 'John'), 2);

        game.join(Player.create('2', 'Mike'), now);

        expect(() => game.join(Player.create('3', 'Jeff'), now)).toThrow();
    });

    test('Player score is increased by 1', () => {
        const game = Game.create('game123', Player.create('1', 'John'), 2);
        game.join(Player.create('2', 'Mike'), new Date());

        game.increasePlayerScore('1', new Date());

        const player = game.getPlayers().find(({ id }) => id === '1') as Player;
        expect(player.getScore()).toBe(1);
    });

    test('Player score is not increased when game is finished', () => {
        const game = Game.create('1', Player.create('1', 'John'), 2);
        game.join(Player.create('2', 'Mike'), new Date());

        expect(() =>
            game.increasePlayerScore('1', dayjs().add(11, 'minute').toDate())
        ).toThrow();
    });

    test('Player score is not increased when game is not started yet', () => {
        const game = Game.create('1', Player.create('1', 'John'), 2);

        expect(() => game.increasePlayerScore('1', new Date())).toThrow();
    });

    test('Player score is not increased when player has not joined', () => {
        const game = Game.create('1', Player.create('1', 'John'), 2);
        game.join(Player.create('2', 'Mike'), new Date());

        expect(() => game.increasePlayerScore('3', new Date())).toThrow();
    });

    test('Player can not joined when game is already started', () => {
        const game = Game.create('1', Player.create('1', 'John'), 2);

        game.join(Player.create('2', 'Mike'), new Date());

        expect(() =>
            game.join(Player.create('3', 'Mike'), new Date())
        ).toThrow();
    });

    test("Game can't be finished if it's not started yet", () => {
        const game = Game.create('1', Player.create('1', 'John'), 2);

        expect(game.getSession()).toBe(undefined);
        expect(() => game.finish(new Date())).toThrow();
    });

    test("Game can't be finished if it's started but not over yet", () => {
        const game = Game.create('1', Player.create('1', 'John'), 2);

        game.join(Player.create('2', 'Mike'), new Date());

        expect(game.getSession()).toBeTruthy();
        expect(game.getSession()!.isOver(new Date())).toBeFalse();
        expect(() => game.finish(new Date())).toThrow();
    });

    test('Game can be finished only one time', async () => {
        const game = Game.create('1', Player.create('1', 'John'), 2);
        const past = dayjs().subtract(MINUTES_TO_PLAY, 'minutes').toDate();

        game.join(Player.create('2', 'Mike'), past);
        game.finish(new Date());

        expect(() => game.finish(new Date())).toThrow();
    });

    test('Game finishes correctly', async () => {
        const game = Game.create('1', Player.create('1', 'John'), 2);
        const past = dayjs().subtract(MINUTES_TO_PLAY, 'minutes').toDate();
        const now = new Date();

        game.join(Player.create('2', 'Mike'), past);
        game.finish(now);

        expect(game.getFinishedAt()).toBe(now);
        expect(game.isFinished()).toBeTrue();
        expect(game.events).toEqual([
            new GameStartedEvent(MINUTES_TO_PLAY, past, '1', ['1', '2']),
            new GameFinishedEvent(
                MINUTES_TO_PLAY,
                past,
                '1',
                [
                    { id: '1', score: 0 },
                    { id: '2', score: 0 }
                ],
                now
            )
        ]);
    });
});
