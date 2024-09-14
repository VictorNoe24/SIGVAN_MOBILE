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
            [await userId]
        );
    } catch (e) {
        LOGGER.error(e);
    }
};

export const insertCategory = async (nameCategory) => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName)
        return await db.runAsync(
            `INSERT INTO categories (name_category, id_user, id_status) VALUES (?, ?, 1);`,
            [nameCategory, await userId])
    } catch (e) {
        LOGGER.error(e);
    }
};

export const getAllCategoriesModel = async () => {
    try {
        const data = [];
        const db = await SQLite.openDatabaseAsync(databaseName)
        for await (const row of db.getEachAsync(
            `SELECT * 
                    FROM categories 
                    WHERE id_user=? 
                    ORDER BY name_category DESC;`,
            [await userId]
        )) {
            data.push({key:row.id_category, value:row.name_category})
        }
        return data;
    } catch (e) {
        LOGGER.error(e);
    }
}

