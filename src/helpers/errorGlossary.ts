import KerError from "../ker/error";
import { IKerError, IKerErrorGlossaryDefinition } from "../types/error.types";
import { ErrorProps } from "../types/props.types";

export default class KerUtilsGlossary {

    private static errorGlossary: IKerErrorGlossaryDefinition[]

    // functions for storage
    public static loadErrorDefinitions(errorDefinitions:IKerErrorGlossaryDefinition[]) {
        this.errorGlossary = [
            ...errorDefinitions,
        ]
    }

    // error definition
    public static throwError(errorName: string, errorProps: ErrorProps | undefined = undefined) {
        let error = this.errorGlossary.find((e: IKerErrorGlossaryDefinition) => e.errorName === errorName);
        let newError: IKerError

        // error is found. Normal procedure by composing the error with the glossary stored data
        if (error) {
            newError = {
                ...error,
                date: new Date()
            }

            if (errorProps) {
                newError = { ...newError, ...errorProps };
            }
        } else {
            newError = {
                errorName: errorName,
                httpCode: 500,
                date: new Date(),
                message: 'Unknown Server Error'
            };

            if (errorProps) {
                newError = { ...newError, ...errorProps };
            }
        }

        return new KerError(newError)
    }

}