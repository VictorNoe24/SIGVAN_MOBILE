import * as SQLite from "expo-sqlite";
import {databaseName, LOGGER} from "../../utils/env";

export const loginAPI = async (email, password) => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName)
    const result = await db.getFirstAsync(
        'SELECT * FROM users WHERE email=? AND password=?',
        [email, password]
    );
    LOGGER.info('Se a podido iniciar sesión: ', result);
    return result;
  } catch (e) {
    LOGGER.error(e);
  }
}

export const getByIdUser  = async (id) => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const result = await db.getFirstAsync(
        'SELECT * FROM users WHERE id_user=?;',
        [id]
    );
    LOGGER.info('Se a podido iniciar sesión: ', result);
    return result.id;
  } catch (e) {
    LOGGER.error(e);
  }
}

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
      LOGGER.error(e);
  }
}