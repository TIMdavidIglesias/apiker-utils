export type IKerError = IKerErrorGlossaryDefinition & { date: Date }

export interface IKerErrorGlossaryDefinition {
    errorName: string,
    httpCode: number
    exception?: any,
    message?: string,
    messageInternal?: string,
    info?: string,
}