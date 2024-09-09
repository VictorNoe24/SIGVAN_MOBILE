import * as SQLite from 'expo-sqlite';
import {databaseName, LOGGER} from "../utils/env";

export const CreateTables = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS status (
                id_status INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                type_name VARCHAR(50) NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS users (
                id_user INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                name VARCHAR(150) NOT NULL,
                lastname VARCHAR(150) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                password VARCHAR(150) NOT NULL,
                created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                id_status INTEGER NOT NULL,
                FOREIGN KEY (id_status) REFERENCES status (id_status)
            );
            
            CREATE TABLE IF NOT EXISTS companies (
                id_company INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                image_company TEXT NOT NULL,
                name_company VARCHAR(150) NOT NULL,
                country VARCHAR(50) NOT NULL,
                address VARCHAR(150) NOT NULL,
                id_user INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user)
            );
            
            CREATE TABLE IF NOT EXISTS categories (
                id_category INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                name_category VARCHAR(50) NOT NULL,
                id_user INTEGER NOT NULL,
                id_status INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user),
                FOREIGN KEY (id_status) REFERENCES status (id_status)
            );
            
            CREATE TABLE IF NOT EXISTS products (
                id_product INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                name_product VARCHAR(150) NOT NULL,
                description TEXT NULL,
                purchase_price DOUBLE NOT NULL,
                sale_price DOUBLE NOT NULL,
                stock INTEGER NOT NULL,
                sold INTEGER NOT NULL,
                bar_code LONG NOT NULL,
                discount DOUBLE NULL,
                created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                id_user INTEGER NOT NULL,
                id_status INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user),
                FOREIGN KEY (id_status) REFERENCES status (id_status)
            );
            
            CREATE TABLE IF NOT EXISTS photo_products (
                id_photo_product INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                number_photo INTEGER NOT NULL,
                url_photo TEXT NOT NULL,
                id_user INTEGER NOT NULL,
                id_product INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user),
                FOREIGN KEY (id_product) REFERENCES products (id_product)
            );
            
            CREATE TABLE IF NOT EXISTS sales (
                id_sales INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                total DOUBLE NOT NULL,
                subtotal DOUBLE NOT NULL,
                payment_method VARCHAR(150) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                id_user INTEGER NOT NULL,
                id_status INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user),
                FOREIGN KEY (id_status) REFERENCES status (id_status)
            );
            
            CREATE TABLE IF NOT EXISTS product_sales (
                id_product_sale INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                stock INTEGER NOT NULL,
                total DOUBLE NOT NULL,
                subtotal DOUBLE NOT NULL,
                created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                id_user INTEGER NOT NULL,
                id_product INTEGER NOT NULL,
                id_status INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user),
                FOREIGN KEY (id_product) REFERENCES products (id_product),
                FOREIGN KEY (id_status) REFERENCES status (id_status)
            );
            
            CREATE TABLE IF NOT EXISTS repayments (
                id_repayment INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                concept VARCHAR(150) NOT NULL,
                repayment DOUBLE NOT NULL,
                created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
                id_user INTEGER NOT NULL,
                id_product INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user),
                FOREIGN KEY (id_product) REFERENCES products (id_product)
            );
        `);
        LOGGER.info('Se crearon correctamente las tablas');
    } catch (e) {
        LOGGER.error(e);
    }
}

export const CreateTriggers = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(databaseName);
        await db.execAsync(`
            -- Trigger para insertar created_at y updated_at en 'users' al crear un registro
            CREATE TRIGGER IF NOT EXISTS insert_user_created_at
            AFTER INSERT ON users
            FOR EACH ROW
            BEGIN
                UPDATE users SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id_user = NEW.id_user;
            END;

            -- Trigger para actualizar updated_at cuando un registro en 'users' es modificado
            CREATE TRIGGER IF NOT EXISTS update_user_updated_at
            AFTER UPDATE ON users
            FOR EACH ROW
            BEGIN
                UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id_user = OLD.id_user;
            END;

            -- Trigger para insertar created_at y updated_at en 'products' al crear un registro
            CREATE TRIGGER IF NOT EXISTS insert_product_created_at
            AFTER INSERT ON products
            FOR EACH ROW
            BEGIN
                UPDATE products SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id_product = NEW.id_product;
            END;

            -- Trigger para actualizar updated_at cuando un registro en 'products' es modificado
            CREATE TRIGGER IF NOT EXISTS update_product_updated_at
            AFTER UPDATE ON products
            FOR EACH ROW
            BEGIN
                UPDATE products SET updated_at = CURRENT_TIMESTAMP WHERE id_product = OLD.id_product;
            END;

            -- Trigger para insertar created_at y updated_at en 'sales' al crear un registro
            CREATE TRIGGER IF NOT EXISTS insert_sales_created_at
            AFTER INSERT ON sales
            FOR EACH ROW
            BEGIN
                UPDATE sales SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id_sales = NEW.id_sales;
            END;

            -- Trigger para actualizar updated_at cuando un registro en 'sales' es modificado
            CREATE TRIGGER IF NOT EXISTS update_sales_updated_at
            AFTER UPDATE ON sales
            FOR EACH ROW
            BEGIN
                UPDATE sales SET updated_at = CURRENT_TIMESTAMP WHERE id_sales = OLD.id_sales;
            END;

            -- Trigger para insertar created_at y updated_at en 'product_sales' al crear un registro
            CREATE TRIGGER IF NOT EXISTS insert_product_sales_created_at
            AFTER INSERT ON product_sales
            FOR EACH ROW
            BEGIN
                UPDATE product_sales SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id_product_sale = NEW.id_product_sale;
            END;

            -- Trigger para actualizar updated_at cuando un registro en 'product_sales' es modificado
            CREATE TRIGGER IF NOT EXISTS update_product_sales_updated_at
            AFTER UPDATE ON product_sales
            FOR EACH ROW
            BEGIN
                UPDATE product_sales SET updated_at = CURRENT_TIMESTAMP WHERE id_product_sale = OLD.id_product_sale;
            END;

            -- Trigger para insertar created_at y updated_at en 'repayments' al crear un registro
            CREATE TRIGGER IF NOT EXISTS insert_repayment_created_at
            AFTER INSERT ON repayments
            FOR EACH ROW
            BEGIN
                UPDATE repayments SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id_repayment = NEW.id_repayment;
            END;

            -- Trigger para actualizar updated_at cuando un registro en 'repayments' es modificado
            CREATE TRIGGER IF NOT EXISTS update_repayment_updated_at
            AFTER UPDATE ON repayments
            FOR EACH ROW
            BEGIN
                UPDATE repayments SET updated_at = CURRENT_TIMESTAMP WHERE id_repayment = OLD.id_repayment;
            END;
        `);
        LOGGER.info('Se crearon correctamente los triggers');
    } catch (e) {
        LOGGER.error(e);
    }
}