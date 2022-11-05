import { Options } from '@mikro-orm/core';
import field from './game/database/schemas/field';
import session from './game/database/schemas/session';
import gameEntity from './game/database/schemas/entity';
import game from './game/database/schemas/game';
import player from './game/database/schemas/player';
import bet from './bet/schemas/bet';
import betEntity from './bet/schemas/entity';
import status from './bet/schemas/status';

const gameSchemas = [field, session, gameEntity, game, player];
const betSchemas = [bet, betEntity, status];

const options: Options = {
    type: 'sqlite',
    dbName: process.NODE_ENV === 'test' ? 'humsters.test.db' : 'humsters.db',
    entities: [...gameSchemas, ...betSchemas]
};

export default options;
