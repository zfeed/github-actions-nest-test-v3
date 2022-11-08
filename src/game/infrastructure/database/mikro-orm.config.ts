import field from './schemas/field';
import session from './schemas/session';
import matchEntity from './schemas/entity';
import match from './schemas/match';
import player from './schemas/player';

const options = {
    entities: [field, session, matchEntity, match, player]
};

export default options;
