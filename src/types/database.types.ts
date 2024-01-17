export interface IKerDatabase {
    serviceName: string,
    defaultDb: string,
    host: IKerDatabaseHost,
    auth: IKerDatabaseAuth,
    options?: IKerDatabaseConnectionOptions
}

export interface IKerDatabaseAuth {
    username: string
    password?: string
}

export interface IKerDatabaseHost {
    host: string,
    port: number,
}

export interface IKerDatabaseConnectionOptions {
    connectTimeoutMS?: number,
    heartbeatFrequencyMS?: number,
    useNewUrlParser?: boolean,
    useUnifiedTopology?: boolean,
}