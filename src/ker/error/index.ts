import { IKerError } from "../../types/error.types";

export default class KerError {
    private errorName: string;
    private httpCode: number;
    private messageInternal: string | undefined;
    private message: string | undefined;
    private info: string | undefined;
    private exception: any | undefined;
    private date: Date;

    constructor(error: IKerError) {
        this.errorName = error.errorName;
        this.httpCode = error.httpCode;
        this.messageInternal = error.messageInternal;
        this.message = error.message;
        this.info = error.info;
        this.exception = error.exception;
        this.date = error.date;
    }

    public getErrorSummary() {
        return {
            errorName: this.errorName,
            httpCode: this.httpCode,
            messageInternal: this.messageInternal,
            message: this.message,
            info: this.info,
            exception: this.exception,
            date: this.date
        }
    }
}