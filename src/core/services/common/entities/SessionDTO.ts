import { ApiProperty } from '@nestjs/swagger';
import Session from '../../../domain/common/Session';
import { MINUTES_TO_PLAY } from '../../../constants';

export default class SessionDTO {
    @ApiProperty({ default: MINUTES_TO_PLAY })
    readonly minutesToPlay: number;

    @ApiProperty()
    readonly startedAt: string;

    private constructor(minutesToPlay: number, startedAt: string) {
        this.minutesToPlay = minutesToPlay;
        this.startedAt = startedAt;
    }

    static create(session: Session) {
        return new this(session.minutesToPlay, session.startedAt.toISOString());
    }
}
