import { sql } from "../config/db.js";

export const getAuthorStats = async (req, res) => {
    try {
        const userId = req.session.user.id;
        // get author id from user id 
        const authorResult = await sql`
            SELECT id FROM authors WHERE user_id = ${userId}
        `;
        if(authorResult.length === 0 ) { 
            return res.status(404).json({ message: "Author not found" });
        
        }
        const authorId = authorResult[0].id;

        const [totalNews, totalViews, hotNewsCount, recentNews] = await Promise.all([
            sql`SELECT COUNT(*) FROM news WHERE author_id = ${authorId}`,
            sql`SELECT COALESCE(SUM(views), 0) FROM news WHERE author_id = ${authorId}`,
            sql`SELECT COUNT(*) FROM news WHERE author_id = ${authorId} AND is_hot = TRUE`,
            sql`SELECT * FROM news WHERE author_id = ${authorId} ORDER BY created_at DESC LIMIT 5`
        ])

        res.status(200).json({
            success: true,
            data: {
                totalNews: parseInt(totalNews[0].count),
                totalViews: parseInt(totalViews[0].coalesce),
                hotNewsCount: parseInt(hotNewsCount[0].count),
                recentNews: recentNews
            }
        })
    } catch (err) {
        console.log("Error in getAuthorStats function:", err);
        res.status(500).json({ error: err.message });
    }
};

export const getAuthorNews = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const authorResult = await sql`
            SELECT id FROM authors WHERE user_id = ${userId}
        `;
        if(authorResult.length === 0 ) { 
            return res.status(404).json({ message: "Author not found" });
        
        }
        const authorId = authorResult[0].id;
        const news = await sql`
            SELECT n.*, c.name as category_name
            FROM news n
            LEFT JOIN categories c ON n.category_id = c.id
            WHERE n.author_id = ${authorId}
            ORDER BY n.created_at DESC
            LIMIT ${limit}
            OFFSET ${offset}
        `;
        const totalResult = await sql`SELECT COUNT(*) FROM news WHERE author_id = ${authorId}`;
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
        })
    } catch (err) {
        console.log("Error in getAuthorNews function:", err);
        res.status(500).json({ error: err.message });
    }
}