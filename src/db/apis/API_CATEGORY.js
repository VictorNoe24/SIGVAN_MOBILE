import * as SQLite from "expo-sqlite";
import {databaseName, LOGGER} from "../../utils/env";

export const getAllCategory = async () => {
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
};
