import Game from '../../core/domain/Game';
import IGameRepository from '../../core/repositories/GameRepository';

class GameRepository implements IGameRepository {
    storage: typeof process['gameStorage'];

    constructor() {
        this.storage = process.gameStorage;
    }

    getById(gameId: string): Game | null {
        if (process.gameStorage[gameId]) {
            return this.storage[gameId] as Game;
        }

        return null;
    }

    save(game: Game): void {
        this.storage[game.id] = game;
    }
}

export default GameRepository;
