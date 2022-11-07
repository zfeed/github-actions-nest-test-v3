import { Options } from '@mikro-orm/core';
import bettingConfig from './betting/infrastructure/database/mikro-orm.config';
import gameConfig from './game/infrastructure/database/mikro-orm.config';

const options: Options = {
    type: 'sqlite',
    dbName: process.NODE_ENV === 'test' ? 'humsters.test.db' : 'humsters.db',
    entities: [...gameConfig.entities, ...bettingConfig.entities]
};

export default options;
