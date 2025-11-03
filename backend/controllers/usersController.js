import { sql } from "../config/db.js";

// Get all news users
export const getAllUsers = async (req, res) => {
    try {
        const allusers = await sql`
        SELECT * FROM users ORDER BY created_at DESC`;
        res.status(200).json({ success: true, data: allusers });
    } catch (err) {
        console.log("Error in getAllUsers function:", err);
        res.status(500).json({ error: err.message });
    }
}


// Get a single user by ID
export const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await sql`
        SELECT * FROM users WHERE id = ${id}`;
        if(user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, data: user[0] });
    } catch (err) {
        console.log("Error in getUserById function:", err);
        res.status(500).json({ error: err.message });
    }
}

// Update a user by ID
export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {username, email, role, full_name, phone, address} = req.body;
        const existUser = await sql`SELECT * FROM users WHERE id = ${id}`;
        if(existUser.length === 0) { 
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await sql`
        UPDATE users SET username = ${username}, email = ${email}, role = ${role}, full_name = ${full_name}, phone = ${phone}, address = ${address} WHERE id = ${id} RETURNING *`;
        res.status(200).json({ success: true, data: updatedUser[0] });
    } catch (err) {
        console.log("Error in updateUser function:", err);
        res.status(500).json({ error: err.message });
    }
}

// Delete a user by ID
export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await sql`
        SELECT * FROM users WHERE id = ${id}`;
        if(user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const deletedUser = await sql`
        DELETE FROM users WHERE id = ${id} RETURNING *`;
        res.status(200).json({ success: true, data: deletedUser[0] });
    } catch (err) {
        console.log("Error in deleteUser function:", err);
        res.status(500).json({ error: err.message });
    }
}