import { sql } from "../config/db.js";

// Get all news categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await sql`
        SELECT * FROM categories ORDER BY id DESC`;
        res.status(200).json({success: true, data: categories });
    } catch (err) {
        console.log("Error in getAllCategories function:", err);
        res.status(500).json({error: err.message });
    }
}

// Create a new category
export const addCategory = async (req, res) => {
    try {
        const {name} = req.body;
        if(!name || name.trim() === "") {
            return res.status(400).json({ message: "Category name is required" });
        }
        const exist = await sql`
        SELECT * FROM categories WHERE name = ${name}`;
        if(exist.length > 0) {
            return res.status(400).json({ message: "Category name already exists" });
        }
        const newCategory = await sql`
        INSERT INTO categories (name) VALUES (${name}) RETURNING *`;
        res.status(201).json({ success: true, data: newCategory[0] });

    } catch (err) {
        console.log("Error in addCategory function:", err);
        res.status(500).json({ error: err.message });
    }
}

// Get a single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const {id} = req.params;
        const categorie = await sql`
        SELECT * FROM categories WHERE id = ${id}`;
        if(categorie.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ success: true, data: categorie[0] });
    } catch (err) {
        console.log("Error in getCategoryById function:", err);
        res.status(500).json({ error: err.message });
    }
}

// Update a category by ID
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await sql`
            SELECT * FROM categories WHERE id = ${id}
        `;
        if (category.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        const updatedCategory = await sql`
            UPDATE categories 
            SET name = ${name}
            WHERE id = ${id}
            RETURNING *
        `;

        res.status(200).json({ success: true, data: updatedCategory[0] });
    } catch (err) {
        console.log("Error in updateCategory function:", err);
        res.status(500).json({ error: err.message });
    }
};


// Delete a category by ID
export const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteCategory = await sql`
        DELETE FROM categories WHERE id = ${id} RETURNING *`;
        if(deleteCategory.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (err) {
        console.log("Error in deleteCategory function:", err);
        res.status(500).json({ error: err.message });
    }
}