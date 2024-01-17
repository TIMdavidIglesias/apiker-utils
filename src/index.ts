// import KerDatabase from "./ker/databases"
// import { errorDatabaseDefinitions } from "./ker/databases/_error"
// import KerError from "./ker/error"
// import KerUtilsGlossary from "./ker/error/_glossary"
// import { IKerDatabase } from "./types/databases.types"
// import { IKerError, IKerErrorGlossaryDefinition } from "./types/error.types"
// import { DatabaseProps, Props } from "./types/props.types"

import KerUtilsGlossary from "./helpers/errorGlossary"
import KerDatabase from "./ker/databases"
import { errorDatabaseDefinitions } from "./ker/databases/_error"
import KerError from "./ker/error"
import { IKerDatabase } from "./types/database.types"
import { IKerError } from "./types/error.types"
import { DatabaseProps, Props } from "./types/props.types"

export default class AKUtils {
    private databases: IKerDatabase[]

    constructor(props: Props) {
        this.databases = props.databases
        KerUtilsGlossary.loadErrorDefinitions([
            ...errorDatabaseDefinitions
        ])
        // this.errorGlossary = props.errorGlossary
    }

    public exportDatabaseHandler(serviceName: string, databaseProps: DatabaseProps | undefined = undefined) {
        const db = this.databases.find((db: IKerDatabase) => db.serviceName = serviceName)

        if (!db) {
            throw KerUtilsGlossary.throwError('ERR_DATABASE_NOT_FOUND')
        }

        return new KerDatabase(db, databaseProps || {})
    }

    public exportErrorHandler(error: IKerError) {
        return new KerError(error)
    }

}