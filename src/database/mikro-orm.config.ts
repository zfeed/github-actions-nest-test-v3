import { Options } from '@mikro-orm/core';
import * as betting from '../contexts/betting/infrastructure/database-schemas';
import * as gamingField from '../contexts/gaming/components/field/infrastructure/database-schemas';
import * as gamingMatch from '../contexts/gaming/components/match/infrastructure/database-schemas';
import { entitySchema } from './entity.schema';

const options: Options = {
    type: 'sqlite',
    dbName: process.NODE_ENV === 'test' ? 'humsters.test.db' : 'humsters.db',
    entities: [
        entitySchema,
        gamingField.fieldSchema,
        gamingMatch.matchSchema,
        gamingMatch.playerSchema,
        gamingMatch.sessionSchema,
        betting.betSchema,
        betting.statusSchema
    ]
};

// eslint-disable-next-line import/no-default-export
export default options;
