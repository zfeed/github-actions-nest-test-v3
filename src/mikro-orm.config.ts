import { Options } from '@mikro-orm/core';
import * as betting from './contexts/betting/infrastructure/database-schemas';
import * as gaming from './contexts/gaming/shared/database-schemas';

const options: Options = {
    type: 'sqlite',
    dbName: process.NODE_ENV === 'test' ? 'humsters.test.db' : 'humsters.db',
    entities: [
        gaming.entity,
        gaming.fieldSchema,
        gaming.matchSchema,
        gaming.playerSchema,
        gaming.sessionSchema,
        betting.betSchema,
        betting.entitySchema,
        betting.statusSchema
    ]
};

export default options;
