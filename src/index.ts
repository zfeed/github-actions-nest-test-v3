import { MikroORM } from '@mikro-orm/core';

import Field from './core/domain/Field';

(async () => {
    const orm = await MikroORM.init();

    const fieldRepository = orm.em.fork().getRepository(Field);

    const field = await fieldRepository.findOne('field-id-1');

    if (!field) {
        throw new Error('Not found');
    }

    field.hit(1, 'player-id-1', new Date());

    await fieldRepository.flush();
})();
