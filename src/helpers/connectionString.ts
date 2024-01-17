import { IKerDatabase } from "../types/database.types";

export default function getConnectionString(database: IKerDatabase, defaultDB: string = 'default'): string {
    return `mongodb://${database.auth.username}:${database.auth.password}@${database.host.host}:${database.host.port}/${defaultDB}`;
}