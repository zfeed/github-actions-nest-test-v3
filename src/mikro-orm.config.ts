import { Options } from '@mikro-orm/core';
import field from './game/database/schemas/field';
import session from './game/database/schemas/session';
import gameEntity from './game/database/schemas/entity';
import game from './game/database/schemas/game';
import player from './game/database/schemas/player';
import bettingConfig from './betting/app/database/mikro-orm.config';

const gameSchemas = [field, session, gameEntity, game, player];

const options: Options = {
    type: 'sqlite',
    dbName: process.NODE_ENV === 'test' ? 'humsters.test.db' : 'humsters.db',
    entities: [...gameSchemas, ...bettingConfig.entities]
};

export default options;
