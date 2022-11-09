import { Scope, Provider } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { EventEmitterModule } from '@nestjs/event-emitter';

// TODO: fix it by contributing to mikro-orm/nestjs
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Scope.DEFAULT = NaN;

export function createTestingModule(...providers: Provider[]) {
    const compiled = Test.createTestingModule({
        imports: [MikroOrmModule.forRoot(), EventEmitterModule.forRoot()],
        controllers: [],
        providers
    }).compile();

    return compiled;
}

export async function initialize() {
    const orm = await MikroORM.init();

    const generator = orm.getSchemaGenerator();
    await generator.refreshDatabase();

    await orm.close(true);
}
