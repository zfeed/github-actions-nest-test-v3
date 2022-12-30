import { Options } from '@mikro-orm/core';
import { entitySchema } from '../packages/domain/entity.schema';
import { eventSchema } from '../packages/local-event-storage';
import { idempotencyKeySchema } from '../packages/idempotency-key';

const options: Options = {
    type: 'postgresql',
    debug: process.env.NODE_ENV === 'development',
    dbName: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASSWORD,
    entities: [entitySchema, eventSchema, idempotencyKeySchema]
};

// eslint-disable-next-line import/no-default-export
export default options;
