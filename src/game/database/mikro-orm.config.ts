import { Options } from '@mikro-orm/core';
import field from './schemas/field';
import session from './schemas/session';
import entity from './schemas/entity';
import game from './schemas/game';
import player from './schemas/player';

const options: Options = {
    type: 'sqlite',
    dbName: process.NODE_ENV === 'test' ? 'humsters.test.db' : 'humsters.db',
    entities: [field, session, entity, game, player]
};

export default options;
