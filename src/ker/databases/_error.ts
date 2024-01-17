import { IKerErrorGlossaryDefinition } from "../../types/error.types";

export const errorDatabaseDefinitions: IKerErrorGlossaryDefinition[] = [{
    errorName: 'ERR_DATABASE_NOT_FOUND',
    message: 'Defined database not found',
    httpCode: 500
},{
    errorName: 'ERR_DATABASE_CLOSING_CONNECTION',
    message: 'Error connecting to database',
    httpCode: 500
},{
    errorName: 'ERR_DATABASE_ESTABLISHING_CONNECTION',
    message: 'Error establishing to database',
    httpCode: 500
},{
    errorName: 'ERR_DATABASE_GENERATING_NEW_MODEL',
    message: 'Error while generating new model to database',
    httpCode: 500
},{
    errorName: 'ERR_DATABASE_CREATING_NEW_DB_DOCUMENT',
    message: 'Error while generating new model to database',
    httpCode: 500
}]