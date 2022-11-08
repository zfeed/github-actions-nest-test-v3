/// <reference types="jest-extended" />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StripInternalMethods<T, K extends keyof any> = Omit<T, K>;

declare namespace NodeJS {
    export interface Process {
        NODE_ENV: string;
    }
}
