import { Options } from '@mikro-orm/core';
import field from './game/database/schemas/field';
import session from './game/database/schemas/session';
import entity from './game/database/schemas/entity';
import game from './game/database/schemas/game';
import player from './game/database/schemas/player';

const options: Options = {
    type: 'sqlite',
    dbName: process.NODE_ENV === 'test' ? 'humsters.test.db' : 'humsters.db',
    entities: [field, session, entity, game, player]
};

export default options;
