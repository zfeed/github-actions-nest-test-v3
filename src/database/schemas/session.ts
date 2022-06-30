import { EntitySchema, types } from '@mikro-orm/core';
import Session from '../../core/domain/common/Session';

export default new EntitySchema<Session>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class: Session,
    embeddable: true,
    properties: {
        startedAt: { type: types.datetime },
        minutesToPlay: { type: types.smallint, unsigned: true }
    }
});
