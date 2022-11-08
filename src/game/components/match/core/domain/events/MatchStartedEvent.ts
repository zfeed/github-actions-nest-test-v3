const TYPE = 'MATCH_STARTED' as const;

export default class MatchStartedEvent {
    public readonly type = TYPE;
    static readonly type = TYPE;

    public readonly startedAt: Date;

    public readonly minutesToPlay: number;

    public readonly matchId: string;

    public readonly playersId: string[];

    constructor(
        minutesToPlay: number,
        startedAt: Date,
        matchId: string,
        playersId: string[]
    ) {
        this.minutesToPlay = minutesToPlay;
        this.startedAt = startedAt;
        this.matchId = matchId;
        this.playersId = playersId;
    }
}
