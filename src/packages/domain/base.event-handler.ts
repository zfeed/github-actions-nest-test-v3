import { setTimeout } from 'node:timers/promises';
import { ConnectionException } from '@mikro-orm/core';

export abstract class BaseEventHandler {
    maxTries = 3;

    factor = 0.2;

    multiplier = 10;

    initialTimeout = 300;

    abstract handle(event: unknown): Promise<void>;

    // TODO: Nest.js v8 doesn't allow to send hearbeats that leads to rebalancing
    // Fix: update to v9
    protected async tryToHandle<E, T extends (event: E) => Promise<unknown>>(
        func: T,
        event: E
    ): Promise<void> {
        let retriesCount = 0;
        let timeout = this.getRetryTimeout(this.initialTimeout);

        // eslint-disable-next-line no-plusplus
        while (retriesCount++ < this.maxTries) {
            try {
                // eslint-disable-next-line no-await-in-loop
                await func(event);
            } catch (e: unknown) {
                if (!this.isErrorTransient(e)) {
                    // TODO: write to dead-letter-queue
                    throw e;
                }

                // eslint-disable-next-line no-await-in-loop
                await setTimeout(timeout);
                timeout = this.getRetryTimeout(timeout);
            }
        }
    }

    protected getRetryTimeout(previousRetryTime: number) {
        return (
            this.getRandomNumberBetween(
                previousRetryTime * (1 - this.factor),
                previousRetryTime * (1 + this.factor)
            ) * this.multiplier
        );
    }

    // eslint-disable-next-line class-methods-use-this
    protected isErrorTransient(exception: unknown): boolean {
        if (exception instanceof ConnectionException) {
            return true;
        }

        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    protected getRandomNumberBetween(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
