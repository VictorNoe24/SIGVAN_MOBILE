import * as SQLite from "expo-sqlite";
import {databaseName, LOGGER} from "../../utils/env";

export const registerAPI = async (name, lastname, phone, email, password, id_status) => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName);

    const result = await db.runAsync(
        'INSERT INTO users (name, lastname, phone, email, password, id_status) VALUES (?, ?, ?, ?, ?, ?)',
        [name, lastname, phone, email, password, id_status]
    );
    LOGGER.info('Se registro correctamente el usuario con ID: ', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (e) {
      log.error(e);
  }
}