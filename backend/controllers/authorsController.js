import { sql } from "../config/db.js";

// Get all authors
export const getAllAuthors = async (req, res) => {
    try {
        const allAuthors = await sql`
            SELECT a.*, u.username, u.avatar_url
            FROM authors a
            LEFT JOIN users u ON a.user_id = u.id
            ORDER BY a.id DESC
        `;
        res.status(200).json({ success: true, data: allAuthors });
    } catch (err) {
        console.error("Error in getAllAuthors:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get author by ID
export const getAuthorById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid ID" });
        const author = await sql`
            SELECT a.*, u.username, u.avatar_url
            FROM authors a
            LEFT JOIN users u ON a.user_id = u.id
            WHERE a.id = ${id}
        `;
        if (author.length === 0) {
            return res.status(404).json({success: false, message: "Author not found" });
        }
        res.status(200).json({ success: true, data: author[0] });
    } catch (err) {
        console.log("Error in getAuthorById:", err);
        res.status(500).json({ error: err.message });
    }
}

// Create new author
export const createAuthor = async (req, res) => {
    try {
        const { name, bio = null, user_id = null } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ success: false, message: "Author name is required" });
        }

        if (user_id) {
            const existUser = await sql`SELECT * FROM users WHERE id = ${user_id}`;
            if (existUser.length === 0) {
                return res.status(400).json({ success: false, message: "User not found" });
            }
        }

        const newAuthor = await sql`
            INSERT INTO authors (name, bio, user_id)
            VALUES (${name}, ${bio}, ${user_id})
            RETURNING *
        `;
        res.status(201).json({ success: true, data: newAuthor[0] });
    } catch (err) {
        console.error("Error in createAuthor:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update author by ID
export const updateAuthor = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid ID" });

        const existAuthor = await sql`SELECT * FROM authors WHERE id = ${id}`;
        if (existAuthor.length === 0) {
            return res.status(404).json({ success: false, message: "Author not found" });
        }

        const { name, bio = null, user_id = null } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ success: false, message: "Author name is required" });
        }

        if (user_id) {
            const existUser = await sql`SELECT * FROM users WHERE id = ${user_id}`;
            if (existUser.length === 0) {
                return res.status(400).json({ success: false, message: "User not found" });
            }
        }

        const updatedAuthor = await sql`
            UPDATE authors
            SET name = ${name}, bio = ${bio}, user_id = ${user_id}
            WHERE id = ${id}
            RETURNING *
        `;
        res.status(200).json({ success: true, data: updatedAuthor[0] });
    } catch (err) {
        console.error("Error in updateAuthor:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete author by ID
export const deleteAuthor = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid ID" });

        const existAuthor = await sql`SELECT * FROM authors WHERE id = ${id}`;
        if (existAuthor.length === 0) {
            return res.status(404).json({ success: false, message: "Author not found" });
        }

        const deletedAuthor = await sql`
            DELETE FROM authors WHERE id = ${id} RETURNING *
        `;
        res.status(200).json({ success: true, data: deletedAuthor[0] });
    } catch (err) {
        console.error("Error in deleteAuthor:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};
