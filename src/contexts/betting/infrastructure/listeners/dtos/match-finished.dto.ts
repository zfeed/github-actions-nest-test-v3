export interface MatchFinishedDTO {
    readonly id: string;

    readonly startedAt: string;

    readonly finishedAt: string;

    readonly minutesToPlay: number;

    readonly matchId: string;

    readonly players: { id: string; score: number }[];
}
