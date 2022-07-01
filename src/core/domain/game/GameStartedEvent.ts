const TYPE = 'GAME_STARTED' as const;

export default class GameStartedEvent {
    public readonly type = TYPE;
    static readonly type = TYPE;

    public readonly startedAt: Date;

    public readonly minutesToPlay: number;

    public readonly gameId: string;

    public readonly playersId: string[];

    constructor(
        minutesToPlay: number,
        startedAt: Date,
        gameId: string,
        playersId: string[]
    ) {
        this.minutesToPlay = minutesToPlay;
        this.startedAt = startedAt;
        this.gameId = gameId;
        this.playersId = playersId;
    }
}
