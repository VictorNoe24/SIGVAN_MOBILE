import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('test_databse_001');

const CreateTables = async () => {
    try {
        await db.execSync(`
            CREATE TABLE IF NOT EXISTS status (
                id_status INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
                type_name VARCHAR(50) NOT NULL
            );
           
            CREATE TABLE IF NOT EXISTS users (
                id_user INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
                name VARCHAR(150) NOT NULL,
                lastname VARCHAR(150) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                email VARCHAR(150) NOT NULL,
                password VARCHAR(150) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                id_status INTEGER NOT NULL,
                FOREIGN KEY (id_status) REFERENCES status (id_status)
            );
            
            CREATE TABLE IF NOT EXISTS companies (
                id_company INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
                name_company VARCHAR(150) NOT NULL,
                country VARCHAR(50) NOT NULL,
                address VARCHAR(150) NOT NULL,
                id_user INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user)
            );
            
            CREATE TABLE IF NOT EXISTS categories (
                id_category INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
                name_category VARCHAR(50) NOT NULL,
                id_user INTEGER NOT NULL,
                id_status INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user),
                FOREIGN KEY (id_status) REFERENCES status (id_status)
            );
            
            CREATE TABLE IF NOT EXISTS products (
                id_product INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
                name_product VARCHAR(150) NOT NULL,
                description TEXT NULL,
                purchase_price DOUBLE NOT NULL,
                sale_price DOUBLE NOT NULL,
                stock INTEGER NOT NULL,
                sold INTEGER NOT NULL,
                bar_code LONG NOT NULL,
                discount DOUBLE NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                id_user INTEGER NOT NULL,
                id_status INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user),
                FOREIGN KEY (id_status) REFERENCES status (id_status)
            );
            
            CREATE TABLE IF NOT EXISTS photo_products (
                id_photo_product INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
                number_photo INTEGER NOT NULL,
                id_user INTEGER NOT NULL,
                id_product INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user),
                FOREIGN KEY (id_product) REFERENCES products (id_product)
            );
            
            CREATE TABLE IF NOT EXISTS sales (
                id_sales INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
                total DOUBLE NOT NULL,
                subtotal DOUBLE NOT NULL,
                payment_method VARCHAR(150) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                id_user INTEGER NOT NULL,
                id_status INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user),
                FOREIGN KEY (id_status) REFERENCES status (id_status)
            );
            
            CREATE TABLE IF NOT EXISTS product_sales (
                id_product_sale INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
                stock INTEGER NOT NULL,
                total DOUBLE NOT NULL,
                subtotal DOUBLE NOT NULL,
                id_user INTEGER NOT NULL,
                id_product INTEGER NOT NULL,
                id_status INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user),
                FOREIGN KEY (id_product) REFERENCES products (id_product),
                FOREIGN KEY (id_status) REFERENCES status (id_status)
            );
            
            CREATE TABLE IF NOT EXISTS repayments (
                id_repayment INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
                concept VARCHAR(150) NOT NULL,
                repayment DOUBLE NOT NULL,
                id_user INTEGER NOT NULL,
                id_product INTEGER NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users (id_user),
                FOREIGN KEY (id_product) REFERENCES products (id_product)
            );
        `);
        return 'Se creo correctamente la base de datos'
    } catch (e) {
        return e;
    }
}

export default {
    CreateTables,
}