import { IKerDatabase, IKerDatabaseConnectionOptions } from "./database.types"

export interface ErrorProps {
    exception?: any,
    message?: string,
    messageInternal?: string,
    info?: any,
}

export interface DatabaseProps {
    defaultDb?: string,
    options?: IKerDatabaseConnectionOptions
}

export interface Props {
    databases: IKerDatabase[]
}