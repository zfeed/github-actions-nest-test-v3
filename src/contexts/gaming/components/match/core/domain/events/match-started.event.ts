const TYPE = 'MATCH_STARTED' as const;

export class MatchStartedEvent {
    public readonly id: string;

    public readonly type = TYPE;

    static readonly type = TYPE;

    public readonly startedAt: Date;

    public readonly minutesToPlay: number;

    public readonly matchId: string;

    public readonly playersId: string[];

    constructor(
        id: string,
        minutesToPlay: number,
        startedAt: Date,
        matchId: string,
        playersId: string[]
    ) {
        this.id = id;
        this.minutesToPlay = minutesToPlay;
        this.startedAt = startedAt;
        this.matchId = matchId;
        this.playersId = playersId;
    }
}
