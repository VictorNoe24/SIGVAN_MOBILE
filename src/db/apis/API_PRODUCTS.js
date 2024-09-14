import * as SQLite from "expo-sqlite";
import {databaseName, LOGGER, userId} from "../../utils/env";

export const getAllRecentProducts = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        const data = [];

        const response = await db.getAllAsync(
            `SELECT p.id_product, p.name_product, 
                 GROUP_CONCAT(pp.url_photo) AS images
                 FROM products AS p
                 INNER JOIN categories AS c ON p.id_category = c.id_category
                 LEFT JOIN photo_products AS pp ON p.id_product = pp.id_product AND pp.id_user = ?
                 WHERE p.id_user = ?
                 GROUP BY p.id_product
                 ORDER BY p.created_at DESC
                 LIMIT 10;`,
            [await userId, await userId]
        );

        for (const product of response) {
            const photos = product?.images ? product.images.split(',') : [];
            data.push({
                id_product: product?.id_product,
                name_product: product?.name_product,
                images: photos
            });
        }
        return data;
    } catch (e) {
        LOGGER.error(e);
    }
};

export const getAllProducts = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        let data = [];

        const response = await db.getAllAsync(
            `SELECT p.id_product, p.name_product, p.description, p.purchase_price, p.sale_price, p.stock, p.bar_code, 
                 p.discount, p.id_status, c.name_category, 
                 GROUP_CONCAT(pp.url_photo) AS images
                 FROM products AS p
                 INNER JOIN categories AS c ON p.id_category = c.id_category
                 LEFT JOIN photo_products AS pp ON p.id_product = pp.id_product AND pp.id_user = ?
                 WHERE p.id_user = ?
                 GROUP BY p.id_product
                 ORDER BY p.created_at DESC;`,
                [await userId, await userId]
        );

        for (const product of response) {
            const photos = product?.images ? product.images.split(',') : [];
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
            });
        }
        return data;
    } catch (e) {
        LOGGER.error(e);
    }
};


export const insertProducts = async (objetProduct) => {
    try {
        LOGGER.info(objetProduct)
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

export const getByIdProduct = async (idProduct) => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        let data = [];

        const response = await db.getAllAsync(
            `SELECT p.id_product, p.name_product, p.description, p.purchase_price, p.sale_price, p.stock, p.bar_code, 
                 p.discount, p.id_status, c.name_category, 
                 GROUP_CONCAT(pp.url_photo) AS images
                 FROM products AS p
                 INNER JOIN categories AS c ON p.id_category = c.id_category
                 LEFT JOIN photo_products AS pp ON p.id_product = pp.id_product AND pp.id_user = ?
                 WHERE p.id_user = ? AND p.id_product = ?
                 GROUP BY p.id_product
                 ORDER BY p.created_at DESC;`,
            [await userId, await userId, idProduct]
        );

        for (const product of response) {
            const photos = product?.images ? product.images.split(',') : [];
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
            });
        }
        return data;

    } catch (e) {
        LOGGER.error(e);
    }
}

