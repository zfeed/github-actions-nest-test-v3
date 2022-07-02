import Session from '../../../domain/common/Session';

export default class SessionDTO {
    private constructor(
        public readonly minutesToPlay: number,
        public readonly startedAt: string
    ) {}

    static create(session: Session) {
        return new this(session.minutesToPlay, session.startedAt.toISOString());
    }
}
