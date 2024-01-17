import { describe, expect, test } from '@jest/globals';
import AKUtils from '../index'

// dbTest
import { dbTest } from './db'

const props = {
  databases: [dbTest]
}

describe('AKUtils class', () => {
  let akUtils;
  let databaseHandler;

  akUtils = new AKUtils(props);
  databaseHandler = akUtils.exportDatabaseHandler('coreDBz');

  test('connects to the database', async () => {
    const connectionResult = await databaseHandler.connect();
    expect(connectionResult).toBe(true);
  });

  test('closing connection to the database', async () => {
    expect(await databaseHandler.close()).toBe(undefined);
  });

});