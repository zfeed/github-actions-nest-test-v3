const TYPE = 'GAME_FINISHED' as const;

export default class GameFinishedEvent {
    static readonly type = TYPE;

    public readonly type = TYPE;

    public readonly startedAt: Date;

    public readonly finishedAt: Date;

    public readonly minutesToPlay: number;

    public readonly gameId: string;

    public readonly players: { id: string; score: number }[];

    constructor(
        minutesToPlay: number,
        startedAt: Date,
        gameId: string,
        players: { id: string; score: number }[],
        finishedAt: Date
    ) {
        this.minutesToPlay = minutesToPlay;
        this.startedAt = startedAt;
        this.finishedAt = finishedAt;
        this.gameId = gameId;
        this.players = players;
    }
}
