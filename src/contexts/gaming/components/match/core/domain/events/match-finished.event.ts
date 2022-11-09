const TYPE = 'MATCH_FINISHED' as const;

export class MatchFinishedEvent {
    static readonly type = TYPE;

    public readonly type = TYPE;

    public readonly startedAt: Date;

    public readonly finishedAt: Date;

    public readonly minutesToPlay: number;

    public readonly matchId: string;

    public readonly players: { id: string; score: number }[];

    constructor(
        minutesToPlay: number,
        startedAt: Date,
        matchId: string,
        players: { id: string; score: number }[],
        finishedAt: Date
    ) {
        this.minutesToPlay = minutesToPlay;
        this.startedAt = startedAt;
        this.finishedAt = finishedAt;
        this.matchId = matchId;
        this.players = players;
    }
}
