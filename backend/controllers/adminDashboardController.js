import { parse } from "dotenv";
import { sql } from "../config/db.js";

export const getAdminStats = async (req, res) => {
    try {
        const [
            totalNews,
            totalUsers,
            totalAuthors,
            totalCategories,
            totalViews,
            hotNewsCount,
        ] = await Promise.all([
            sql`SELECT COUNT(*) FROM news`,
            sql`SELECT COUNT(*) FROM users`,
            sql`SELECT COUNT(*) FROM authors`,
            sql`SELECT COUNT(*) FROM categories`,
            sql`SELECT COALESCE(SUM(views), 0) FROM news`,
            sql`SELECT COUNT(*) FROM news WHERE is_hot = TRUE`,
        ])

        res.status(200).json({
            success: true,
            data: 
            {
                totalNews: parseInt(totalNews[0].count),
                totalUsers: parseInt(totalUsers[0].count),
                totalAuthors: parseInt(totalAuthors[0].count),
                totalCategories: parseInt(totalCategories[0].count),
                totalViews: parseInt(totalViews[0].coalesce),
                hotNewsCount: parseInt(hotNewsCount[0].count),
            }
        })
    } catch (error) {
        console.error(" Error in getAdminDashboard:", error);
        res.status(500).json({ error: error.message });
    }


};

export const getAdminNews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page -1) * limit;

        const news = await sql`
            SELECT n.*, c.name as category_name, a.name as author_name
            FROM news n
            LEFT JOIN categories c ON n.category_id = c.id
            LEFT JOIN authors a ON n.author_id = a.id
            ORDER BY n.created_at DESC
            LIMIT ${limit}
            OFFSET ${offset}
        `;

        const totalResult = await sql`SELECT COUNT(*) FROM news`;
        const total = parseInt(totalResult[0].count);

        res.status(200).json({ 
            success: true, 
            data: news,
            pagination: {
                page, 
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        console.log("Error in getAdminNews function:", err);
        res.status(500).json({ error: err.message });
    }

};
export const getAdminUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page -1) * limit;

        const users = await sql`
            SELECT * FROM users
            ORDER BY created_at DESC
            LIMIT ${limit}
            OFFSET ${offset}
        `;

        const totalResult = await sql`SELECT COUNT(*) FROM users`;
        const total = parseInt(totalResult[0].count);

        res.status(200).json({ 
            success: true, 
            data: users,
            pagination: {
                page, 
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        console.log("Error in getAdminUsers function:", err);
        res.status(500).json({ error: err.message });
    }
};


export const getAdminAuthors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page -1) * limit;

        const authors = await sql`
            SELECT a.*, u.username, u.email
            FROM authors a
            LEFT JOIN users u ON a.user_id = u.id
            ORDER BY a.id DESC
            LIMIT ${limit}
            OFFSET ${offset}
        `;

        const totalResult = await sql`SELECT COUNT(*) FROM authors`;
        const total = parseInt(totalResult[0].count);

        res.status(200).json({
            success: true,
            data: authors,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        })
    } catch (err) {
        console.log("Error in getAdminAuthors function:", err);
        res.status(500).json({ error: err.message });
    }
};
export const getAdminCategories = async (req, res) => {
    try {
        const categories = await sql`
            SELECT * FROM categories
            ORDER BY id DESC
        `;
    } catch (err) {
        console.log("Error in getAdminCategories function:", err);
        res.status(500).json({ error: err.message });
    }
};
