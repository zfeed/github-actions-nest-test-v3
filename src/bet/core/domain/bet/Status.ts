enum code {
    ACTIVE,
    FINISHED
}

class Status {
    static readonly code = code;

    protected constructor(private readonly value: code) {}

    getValue() {
        return this.value;
    }

    public static create(value: code): Status {
        return new Status(value);
    }
}

export default Status;
