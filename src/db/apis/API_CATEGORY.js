import * as SQLite from "expo-sqlite";
import {databaseName, LOGGER} from "../../utils/env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAllCategory = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('AUTH_USER_TOKEN');
        const data = JSON.parse(jsonValue);

        const db = await SQLite.openDatabaseAsync(databaseName)
        return await db.getAllAsync(
            `SELECT * 
                    FROM categories 
                    WHERE id_user=? 
                    ORDER BY name_category DESC 
                    LIMIT 10;`,
            [data?.id_user]
        );
    } catch (e) {
        LOGGER.error(e);
    }
};
