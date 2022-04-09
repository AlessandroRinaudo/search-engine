export type LEVEL = "normal" | "verbose";

export class Log {
    private static instance: Log;
    private minLevel: LEVEL = "normal";

    constructor() {
    }

    public debug(object: string | object) {
        if (this.minLevel === "verbose") {
            console.log(object);
        }
    }

    public trace(object: string | object) {
        if (this.minLevel === "normal") {
            console.log(object);
        }
    }

    public static getInstance(): Log {
        if (!Log.instance) {
            Log.instance = new Log();
        }
        return Log.instance;
    }

    public setMode(mode: "normal" | "verbose") {
        this.minLevel = mode;
    }
}
