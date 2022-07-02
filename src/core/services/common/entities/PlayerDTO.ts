import Player from '../../../domain/game/Player';

export default class PlayerDTO {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly score: number
    ) {}

    static create(player: Player) {
        return new this(player.id, player.name, player.getScore());
    }
}
