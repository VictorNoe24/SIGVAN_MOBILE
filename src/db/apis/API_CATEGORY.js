import * as SQLite from "expo-sqlite";
import {databaseName, LOGGER, userId} from "../../utils/env";

export const getAllCategory = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName)
        return await db.getAllAsync(
            `SELECT * 
                    FROM categories 
                    WHERE id_user=? 
                    ORDER BY name_category DESC 
                    LIMIT 10;`,
            [userId]
        );
    } catch (e) {
        LOGGER.error(e);
    }
};

