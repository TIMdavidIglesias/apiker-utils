// modules
import { Connection, Model, Schema } from "mongoose";
import { IKerDatabase, IKerDatabaseConnectionOptions } from "../../types/database.types";
import { DatabaseProps } from "../../types/props.types";
import KerUtilsGlossary from "../../helpers/errorGlossary";
import getConnectionString from "../../helpers/connectionString";

export default class KerDatabase {
    private connectionString: string;
    private defaultDB: string;
    private serviceName: string;

    private connection: Connection | undefined;
    private options: IKerDatabaseConnectionOptions | undefined;

    constructor(database: IKerDatabase, databaseProps?: DatabaseProps) {
        this.defaultDB = databaseProps && databaseProps.defaultDb ?
            databaseProps.defaultDb :
            database.defaultDb

        this.options = databaseProps && databaseProps.options ?
            databaseProps.options :
            database.options

        this.serviceName = database.serviceName

        this.connectionString = getConnectionString(database, this.defaultDB);
    }

    /**
     * Establishes a connection to the MongoDB database.
     *
     * @param connectionOptions Optional connection options (default is undefined).
     * @throws Throws an ApiError if there's an issue connecting to the database.
     */
    public async connect(): Promise<boolean> {
        try {
            const dynamicMongoModule = require('mongoose')
            this.connection = await new Promise(async (resolve, reject) => {
                try {
                    const connection = await dynamicMongoModule.createConnection(this.connectionString, this.options);
                    return resolve(connection);
                } catch (error) {
                    return reject(error);
                }
            });

            return true
        } catch (ex) {
            throw KerUtilsGlossary.throwError('ERR_DATABASE_ESTABLISHING_CONNECTION', { exception: ex, info: `${this.serviceName}` })
        }
    }

    // /**
    //  * Deletes a model from the MongoDB database.
    //  *
    //  * @param modelName The name of the model to delete.
    //  */
    // public deleteModel(modelName: string) {
    //     this.connection?.deleteModel(modelName);
    // }

    // /**
    //  * Closes the MongoDB database connection.
    //  *
    //  * @throws Throws an ApiError if there's an issue closing the connection.
    //  */
    public async close(): Promise<void> {
        try {
            await this.connection?.close();
        } catch (ex) {
            throw KerUtilsGlossary.throwError('ERR_DATABASE_CLOSING_CONNECTION', { exception: ex, info: `${this.serviceName}` })
        }
    }

    // /**
    //  * Creates a Mongoose model from a schema for the specified collection.
    //  *
    //  * @param schema The Mongoose schema to use.
    //  * @param collectionName The name of the collection.
    //  * @returns The created Mongoose model.
    //  * @throws Throws an ApiError if there's an issue creating the model.
    //  */
    public async createModelFromSchema(schema: Schema, collectionName: string) {
        try {
            const model = await (this.connection as Connection).model(collectionName, schema)
            return model
        } catch (ex) {
            throw KerUtilsGlossary.throwError('ERR_DATABASE_GENERATING_NEW_MODEL_FROM_SCHEMA', { exception: ex, info: { model: `${this.serviceName}`, schema: `${schema}` } })
        }
    }

    // /**
    //  * Creates a document in the MongoDB database using the specified model and data.
    //  *
    //  * @param model The Mongoose model to use.
    //  * @param data The data to insert (default is an empty object).
    //  * @returns The created document.
    //  * @throws Throws an ApiError if there's an issue creating the document.
    //  */
    public async createDocument(model: typeof Model, data: any = {}): Promise<any> {
        try {
            if (Array.isArray(data)) {
                return await model.collection.insertMany(data).catch((exception) => { throw exception });
            } else {
                return await model.create(data);
            }
        } catch (ex) {
            throw KerUtilsGlossary.throwError('ERR_DATABASE_CREATING_NEW_DB_DOCUMENT', { exception: ex, info: { model: `${this.serviceName}` } })
            // const errorDetails: IApiError = {
            //     name: 'ERR_MONGODB_CREATE_DOCUMENT_ERROR',
            //     exception: exception,
            //     additionalInfo: `${this.isMaster ? '[MASTER]' : '[SLAVE]'} SconnString: ${this.connectionString}`
            // };
            // throw new ApiError(errorDetails);
        }
    }

    // /**
    //  * Finds documents in the MongoDB database using the specified model, limit, criteria, and raw flag.
    //  *
    //  * @param model The Mongoose model to use.
    //  * @param limit The maximum number of documents to retrieve (default is 0).
    //  * @param criteria The search criteria (default is an empty object).
    //  * @param raw Whether to return raw documents (default is true).
    //  * @returns The found documents.
    //  * @throws Throws an ApiError if there's an issue finding documents.
    //  */
    // public async findDocument(model: typeof Model, limit: number = 0, criteria: any = {}, raw: boolean = true): Promise<any> {
    //     try {
    //         let res;
    //         res = await model.find(criteria).limit(limit);
    //         if (Object.keys(res).length === 0) return
    //         if (limit === 1 && Array.isArray(res)) return raw ? res[0] : res[0].toObject()
    //         // return res.map((r)=>{return{...r.toObject(),id:r.toObject()['_id'].id.toString('hex')}});
    //         return res.map((r) => { return raw ? r : r.toObject() });
    //     } catch (exception) {
    //         const errorDetails: IApiError = {
    //             name: 'ERR_MONGODB_DATABASE_FIND_ERROR',
    //             additionalInfo: `${this.isMaster ? '[MASTER]' : '[SLAVE]'} SconnString: ${this.connectionString}`,
    //             exception: exception,
    //         };
    //         throw new ApiError(errorDetails);
    //     }
    // }

    // /**
    //  * Updates documents in the MongoDB database using the specified model, limit, criteria, and data.
    //  *
    //  * @param model The Mongoose model to use.
    //  * @param limit The maximum number of documents to update (default is 1).
    //  * @param criteria The update criteria.
    //  * @param dataUpdated The data to update the documents.
    //  * @returns The result of the update operation.
    //  * @throws Throws an ApiError if there's an issue updating documents.
    //  */
    // public async updateDocument(model: typeof Model, limit: number = 1, criteria: any = {}, dataUpdated: any = {}): Promise<any> {
    //     try {
    //         // Eliminar campos _id y __v de dataUpdated
    //         delete dataUpdated._id;
    //         delete dataUpdated.__v;

    //         let res;
    //         res = await model.updateMany(criteria, dataUpdated).limit(limit);

    //         if (limit === 1 && Array.isArray(res)) {
    //             // Si limit es 1 y el resultado es un array, devolver el primer elemento
    //             return res[0];
    //         }

    //         return res;
    //     } catch (exception) {
    //         const errorDetails: IApiError = {
    //             name: 'ERR_MONGODB_DATABASE_UPDATE_ERROR',
    //             additionalInfo: `${this.isMaster ? '[MASTER]' : '[SLAVE]'} SconnString: ${this.connectionString}`,
    //             exception: exception,
    //         };
    //         throw new ApiError(errorDetails);
    //     }
    // }


    // public async deleteDocument(model: typeof Model, criteria: any = {}): Promise<any> {
    //     try {
    //         let res;
    //         res = await model.deleteMany(criteria);
    //         return res;
    //     } catch (exception) {
    //         const errorDetails: IApiError = {
    //             name: 'ERR_MONGODB_DATABASE_DELETE_ERROR',
    //             additionalInfo: `${this.isMaster ? '[MASTER]' : '[SLAVE]'} SconnString: ${this.connectionString}`,
    //             exception: exception,
    //         };
    //         throw new ApiError(errorDetails);
    //     }
    // }

    // /**
    //  * Counts documents in the MongoDB database from the specified collection using the given criteria.
    //  *
    //  * @param collection The name of the collection to count documents from.
    //  * @param criteria The criteria for counting (default is an empty object).
    //  * @returns The count of documents.
    //  * @throws Throws an ApiError if there's an issue counting documents.
    //  */
    // public async countDocumentFromCollection(collection: string, criteria: any = {}): Promise<number> {
    //     try {
    //         return await this.connection?.collection(collection + 's').countDocuments(criteria) || 0;
    //     } catch (exception) {
    //         const errorDetails: IApiError = {
    //             name: 'ERR_MONGODB_DATABASE_COUNT_ERROR',
    //             exception: exception,
    //             additionalInfo: `${this.isMaster ? '[MASTER]' : '[SLAVE]'} SconnString: ${this.connectionString}`
    //         };
    //         throw new ApiError(errorDetails);
    //     }
    // }
}