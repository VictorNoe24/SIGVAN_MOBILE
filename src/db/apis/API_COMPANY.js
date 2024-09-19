import * as SQLite from "expo-sqlite";
import {databaseName, LOGGER} from "../../utils/env";

export const insertCompany = async (company) => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName)
        return await db.runAsync(
            'INSERT INTO companies (image_company, name_company, country, address, id_user) VALUES (?,?,?,?,?);',
            [
                company.image,
                company.name,
                company.country,
                company.address,
                company.id
            ]
        );
    } catch (e) {
        LOGGER.error(e);
    }
}