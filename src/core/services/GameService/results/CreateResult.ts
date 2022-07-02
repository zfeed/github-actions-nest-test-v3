import Result from '../../common/Result';
import GameDTO from '../../common/entities/GameDTO';
import Game from '../../../domain/game/Game';

export default class CreateResult {
    static create(game: Game): Result<
        {
            game: GameDTO;
        },
        null
    > {
        return Result.create({ game: GameDTO.create(game) }, null);
    }
}
