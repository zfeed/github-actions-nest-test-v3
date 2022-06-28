import Game from '../domain/Game';

interface GameRepository {
    getById(gameId: Game['id']): Game | null;

    save(game: Game): void;
}

export default GameRepository;
