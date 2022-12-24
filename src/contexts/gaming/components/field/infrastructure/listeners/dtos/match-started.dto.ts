export interface MatchStartedDTO {
    readonly id: string;

    readonly startedAt: string;

    readonly minutesToPlay: number;

    readonly matchId: string;

    readonly playersId: string[];
}
