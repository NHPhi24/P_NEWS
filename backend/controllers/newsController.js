import { sql } from "../config/db.js";

// Get all news articles
export const getAllNews = async (req, res) => {
    try {
        const news = await sql`
        SELECT n.*, c.name as categories_name, a.name as author_name
        From news n 
        LEFT JOIN categories c ON n.category_id = c.id
        LEFT JOIN authors a ON n.author_id = a.id
        ORDER BY n.created_at DESC`;
        res.status(200).json({success: true, data: news});
    } catch (err) {
        console.log("Error in getAllNews function:", err);
        res.status(500).json({ error: err.message });
    }
}

// Create a new news article
export const createNews = async (req, res) => {
    try {
        const { title, content, author_id, category_id, is_hot } = req.body;
        const currentUser = req.session.user;
        if(!currentUser) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // validate required fields
        if(!title || !content || !author_id || !category_id) {
            return res.status(400).json({ message: "Title, content, author_id and category_id are required" });
        }
        
        let finalAuthorId = author_id;
        let finalIsHot = is_hot;
        // Nếu là Author, tự động gán author_id của chính họ
        if(currentUser.role === "author") {
            // lấy author_id từ user_id 
            const authorResult = await sql`
                SELECT id FROM authors WHERE user_id = ${currentUser.id}
            `;

            if(authorResult.length === 0) {
                return res.status(403).json({ message: "Author profile not found" });
            }

            finalAuthorId = authorResult[0].id;
            if(is_hot === true) {
                return res.status(403).json({ message: "Author can't create hot news" });
            }
            finalIsHot = false;
        }

        // kiểm tra author_id có tồn tại không (cho admin)
        if(currentUser.role === "admin" && author_id) {
            const authorExists = await sql`
                SELECT * FROM authors WHERE id = ${author_id}
            `;

            if(authorExists.length === 0) {
                return res.status(404).json({ message: "Author not found" });
            }
        }


        // create news
        const createdNews = await sql`
        INSERT INTO news (title, content, author_id, category_id, is_hot)
        VALUES (${title}, ${content}, ${finalAuthorId}, ${category_id}, ${finalIsHot}) RETURNING *
        `
        res.status(201).json({ 
            success: true,
            message: "News created successfully",
            data: createdNews[0] 
        });
    } catch (err) {
        console.log("Error in createNews function:", err);
        res.status(500).json({ error: err.message });
    }
}

// Get a single news article by ID
export const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        //get  a news by id 
        const news = await sql`
        SELECT n.*, c.name as categories_name, a.name as author_name
        FROM news n
        LEFT JOIN categories c ON n.category_id = c.id
        LEFT JOIN authors a ON n.author_id = a.id
        WHERE n.id = ${id}`;
        if(news.length === 0) {
            return res.status(404).json({ message: "News not found" });
        }
        await sql`UPDATE news SET views = views + 1 WHERE id = ${id}`;
        res.status(200).json({ success: true, data: news[0] });
    } catch (err) {
        console.log("Error in getNewsById function:", err);
        res.status(500).json({ error: err.message });
    }
}

// Update a news article by ID
export const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const {title, content, author_id, category_id, is_hot, image_url} = req.body;
        const currentUser = req.session.user;
        // check if news exists
        const existNews = await sql`SELECT * FROM news WHERE id = ${id}`;
        if(existNews.length === 0) {
            return res.status(404).json({ message: "News not found" });
        }

        // kiểm tra quyền : author chỉ có thể sửa tin của mình
        if(currentUser.role === 'author') {
            const authorResult = await sql`
                SELECT id FROM authors WHERE user_id = ${currentUser.id}
            `;
            if(authorResult.length===0 || existNews[0].author_id !== authorResult[0].id) {
                return res.status(403).json({ message: "you can only update your own news" });
            }

            if(is_hot === true) {
                return res.status(403).json({ message: "Author can't create hot news" });
            }
        }

        let updateData = {
            title: title || existNews[0].title,
            content: content || existNews[0].content,
            category_id: category_id || existNews[0].category_id,
            image_url: image_url !== undefined ? image_url : existNews[0].image_url,
        };

        if(currentUser.role == 'admin') {
            updateData.author_id = author_id || existNews[0].author_id;
            updateData.is_hot = is_hot !== undefined ? is_hot : existNews[0].is_hot;
        } else {
            updateData.author_id = existNews[0].author_id;
            updateData.is_hot = existNews[0].is_hot;
        }
        // update news
        const updatedNews = await sql`
        UPDATE news
        SET title = ${updateData.title}, 
        content = ${updateData.content}, 
        author_id = ${updateData.author_id}, 
        category_id = ${updateData.category_id}, 
        is_hot = ${updateData.is_hot}
        WHERE id = ${id} RETURNING *`;
        res.status(200).json({ 
            success: true, 
            message: "News updated successfully",
            data: updatedNews[0] 
        });
    } catch (err) {
        console.log("Error in updateNews function:", err);
        res.status(500).json({ error: err.message });
    }
}
// Delete a news article by ID
export const deleteNews = async (req, res) => {
    try {
        const {id} = req.params;
        // check if news exists
        const existNews = await sql`SELECT * FROM news WHERE id = ${id}`;
        if(existNews.length === 0) {
            return res.status(404).json({ message: "News not found" });
        }
        const deletedNews = await sql`
        DELETE FROM news WHERE id = ${id} RETURNING *`;
        res.status(200).json({ 
            success: true, 
            message: "News deleted successfully",
            data: deletedNews[0] 
        });
    } catch (err) {
        console.log("Error in deleteNews function:", err);
        res.status(500).json({ error: err.message });
    }
}

export const getNewsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const news = await sql`
      SELECT n.*, a.name AS author_name, c.name AS category_name
      FROM news n
      LEFT JOIN authors a ON n.author_id = a.id
      LEFT JOIN categories c ON n.category_id = c.id
      WHERE n.category_id = ${categoryId}
      ORDER BY n.created_at DESC;
    `;

    if (news.length === 0) {
      return res.status(404).json({ message: "No news found for this category" });
    }

    res.status(200).json({ success: true, data: news });
  } catch (err) {
    console.error("Error in getNewsByCategory function:", err);
    res.status(500).json({ error: err.message });
  }
};


export const getHotNews = async (req, res) =>{
    try {
        const hotNews = await sql`
        SELECT n.*, a.name as author_name, c.name as category_name
        FROM news n
        LEFT JOIN authors a ON n.author_id = a.id
        LEFT JOIN categories c ON n.category_id = c.id
        WHERE n.is_hot = TRUE
        ORDER BY n.created_at DESC LIMIT 6
        `;
        res.status(200).json({ success: true, data: hotNews });
    } catch (err) {
        console.log("Error in getHotNews function:", err);
        res.status(500).json({ error: err.message });
    }
}
