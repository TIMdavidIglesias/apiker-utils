import { IKerDatabase } from "../types/database.types";

export const dbTest: IKerDatabase = {
    // unique name of the database (required)
    serviceName: 'coreDB',
    // default connection collection (required)
    defaultDb: 'apis',
    host: {
        // database host (required)
        host: '100.0.0.12',
        // database port (required)
        port: 27117,
    },
    auth: {
        // database auth user (required)
        username: 'root',
        // database auth password (optional)
        password: 'underground',
    },
    options: {
        // connection timeout (optional)
        connectTimeoutMS: 50000000,
        heartbeatFrequencyMS: 10000000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}