import * as SQLite from "expo-sqlite";
import {databaseName, LOGGER, userId} from "../../utils/env";

export const getAllRecentProducts = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName)
        const data = [];

        const response = await db.getAllAsync(
            `SELECT p.id_product, p.name_product
                    FROM products p
                    JOIN categories c ON p.id_product = c.id_category
                    WHERE p.id_user = ?
                    ORDER BY p.created_at DESC
                    LIMIT 10;`,
            [await userId]
        );

        for (const product of response) {
            const photos = [];
            for await (const img of db.getEachAsync(
                `SELECT url_photo FROM photo_products WHERE id_product = ? AND id_user = ?;`,
                [product?.id_product, await userId]
            )) {
                photos.push(img?.url_photo)
            }
            data.push({
                id_product: product?.id_product,
                name_product: product?.name_product,
                images: photos
            })
        }
        return data;
    } catch (e) {
        LOGGER.error(e);
    }
};

export const getAllProducts = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName)
        const data = [];

        const response = await db.getAllAsync(
            `SELECT p.id_product, p.name_product, p.description, p.purchase_price, p.sale_price, p.stock, p.bar_code, p.discount, p.id_status, c.name_category
                    FROM products p
                    JOIN categories c ON p.id_product = c.id_category
                    WHERE p.id_user = ?
                    ORDER BY p.created_at DESC;`,
            [await userId]
        );
        for (const product of response) {
            const photos = [];
            for await (const img of db.getEachAsync(
                `SELECT url_photo FROM photo_products WHERE id_product = ? AND id_user = ?;`,
                [product?.id_product, await userId]
            )) {
                photos.push(img?.url_photo)
            }
            data.push({
                    id_product: product?.id_product,
                    name_product: product?.name_product,
                    description: product?.description,
                    purchase_price: product?.purchase_price,
                    sale_price: product?.sale_price,
                    stock: product?.stock,
                    bar_code: product?.bar_code,
                    discount: product?.discount,
                    id_status: product?.id_status,
                    name_category: product?.name_category,
                    images: photos
            })
        }
        return data;
    } catch (e) {
        LOGGER.error(e);
    }
}

export const insertProducts = async (objetProduct) => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName)
        return await  db.runAsync(
            `INSERT INTO products (name_product, description, purchase_price, sale_price, stock, bar_code, id_user, id_status, id_category) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                objetProduct.nameProduct,
                objetProduct.description,
                objetProduct.purchasePrice,
                objetProduct.salePrice,
                objetProduct.stock,
                objetProduct.barCode,
                await userId,
                1,
                objetProduct.idCategory
            ]
        )
    } catch (e) {
        LOGGER.error(e);
    }
}

export const insertPhotos = async (idProduct, images) => {
    try {
        let index = 0;
        const db = await SQLite.openDatabaseAsync(databaseName)
        for (const image of images) {
            await db.runAsync(
                `INSERT INTO photo_products (number_photo, url_photo, id_user, id_product) VALUES (?, ?, ?, ?);`,
                [index++, image, await userId, idProduct]);
        }
        return true;
    } catch (e) {
        LOGGER.error(e);
    }
}

