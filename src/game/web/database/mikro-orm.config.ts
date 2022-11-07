import field from './schemas/field';
import session from './schemas/session';
import gameEntity from './schemas/entity';
import game from './schemas/game';
import player from './schemas/player';

const options = {
    entities: [field, session, gameEntity, game, player]
};

export default options;
