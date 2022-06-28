interface GameStorage {
    [index: string]: object;
}

interface FieldStorage {
    [index: string]: object;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StripInternalMethods<T, K extends keyof any> = Omit<T, K>;

declare module 'process' {
    global {
        // eslint-disable-next-line no-var, vars-on-top, no-use-before-define
        var process: NodeJS.Process;
        namespace NodeJS {
            interface Process {
                gameStorage: GameStorage;
                fieldStorage: FieldStorage;
            }
        }
    }
}
