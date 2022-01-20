export class ApiUnexpectedException extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ApiUnexpectedException.prototype);
    }
}