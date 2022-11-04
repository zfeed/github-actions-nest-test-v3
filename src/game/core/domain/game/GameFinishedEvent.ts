const TYPE = 'GAME_FINISHED' as const;

export default class GameFinishedEvent {
    public readonly type = TYPE;

    public readonly startedAt: Date;

    public readonly finishedAt: Date;

    public readonly minutesToPlay: number;

    public readonly gameId: string;

    public readonly playersId: string[];

    constructor(
        minutesToPlay: number,
        startedAt: Date,
        gameId: string,
        playersId: string[],
        finishedAt: Date
    ) {
        this.minutesToPlay = minutesToPlay;
        this.startedAt = startedAt;
        this.finishedAt = finishedAt;
        this.gameId = gameId;
        this.playersId = playersId;
    }
}
