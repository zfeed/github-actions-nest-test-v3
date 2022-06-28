import * as dayjs from 'dayjs';

import Game from './Game';
import Player from './Player';
import GameStartedEvent from './events/GameStartedEvent';
import Session from './Session';

describe('Game', () => {
    test('Game is created', () => {
        const game = Game.create('1', Player.create('1', 'playerName'), 2);

        expect(game.getSession()).toBe(null);
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

        game.join(Player.create('2', 'Mike'), new Date());

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
});
