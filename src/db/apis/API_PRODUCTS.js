import * as SQLite from "expo-sqlite";
import {databaseName, userId} from "../../utils/env";

export const getAllRecentProducts = async () => {
    const db = await SQLite.openDatabaseAsync(databaseName)
    return await db.getAllAsync(
        `SELECT p.id_product, p.name_product, p.created_at, pp.url_photo
                FROM products p
                JOIN photo_products pp ON p.id_product = pp.id_product
                WHERE p.id_user = ?
                ORDER BY p.created_at DESC
                LIMIT 10;`,
        [await userId]
    );
};

export const getAllProducts = async () => {
    const db = await SQLite.openDatabaseAsync(databaseName)
    return await db.getAllAsync(
        `SELECT p.id_product, p.name_product, p.created_at, pp.url_photo
        FROM products p
        JOIN photo_products pp ON p.id_product = pp.id_product
        WHERE p.id_user = ?
        ORDER BY p.created_at DESC;`,
        [await userId]
    )
}