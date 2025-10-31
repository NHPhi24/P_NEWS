import { sql } from "./db.js";

export async function initDB() {
    try {


        // Bảng người dùng (user + admin + author)
        await sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY, 
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            role VARCHAR(10) CHECK (role IN ('user','admin','author')) DEFAULT 'user',
            avatar_url VARCHAR(255), 
            created_at TIMESTAMP NOT NULL DEFAULT now()
        )`;
        // Bảng thông tin người dùng
        await sql`
        CREATE TABLE IF NOT EXISTS user_info (
            id SERIAL PRIMARY KEY,
            user_id INTEGER UNIQUE REFERENCES users(id),
            full_name VARCHAR(100),
            phone VARCHAR(20),
            address VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;

        // Bảng danh mục (category)
        await sql`
        CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        // Bảng tác giả (author)
        await sql`
        CREATE TABLE IF NOT EXISTS authors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL,
            bio TEXT DEFAULT NULL,
            user_id INTEGER UNIQUE REFERENCES users(id)
        );`;

        // Bảng tin tức (news)
        await sql`
        CREATE TABLE IF NOT EXISTS news (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL,
            content TEXT NOT NULL,
            image_url TEXT,
            author_id INTEGER REFERENCES authors(id),
            category_id INTEGER REFERENCES categories(id),
            is_hot BOOLEAN DEFAULT FALSE,
            views INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        // // Bảng bình luận (comments)
        // await sql`
        // CREATE TABLE IF NOT EXISTS comments (
        //     id SERIAL PRIMARY KEY,
        //     news_id INTEGER REFERENCES news(id),
        //     user_id INTEGER REFERENCES users(id),
        //     content TEXT NOT NULL,
        //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        // )`;

        console.log("✅ All tables initialized successfully!");
    } catch (err) {
        console.log("❌ Error initDB:", err);
    }
}
