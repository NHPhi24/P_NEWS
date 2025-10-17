import {sql} from "../config/db.js";

// ----------- Register User -----------
export const registerUser = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        // check email exist
        const existUser = await sql`SELECT * FROM users WHERE email = ${email}`;
        if(existUser.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // default role: user if not specified
        const userRole = role && role === "admin" ? "admin" : "user";
        // Insert user
        await sql`INSERT INTO users (username, password, email, role) 
        VALUES (${username}, ${password}, ${email}, ${userRole})`

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log("Error in registerUser function:", err);
        res.status(500).json({ error: err.message });
    }
}
//----------- Login User -----------
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const users = await sql`SELECT * FROM users WHERE email = ${email}`;
        const user = users[0];
        if(!user) {
            return res.status(404).json({ message: "Email not found" });
        }
        if(user.password !== password) { 
            return res.status(401).json({ message: "Invalid password" });
        }

        // Save user info in session
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role, // 'user' or 'admin'
        }

        //role: 'user' or 'admin'
        if(user.role === 'admin') {
            console.log("Admin logged in:", user.username);
            return res.status(200).json({
                success: true,
                message: "Admin logged in successfully",
                role: 'admin',
                user: req.session.user,
            })

        } else if (user.role === 'author') {
            console.log("Author logged in:", user.username);
            return res.status(200).json({
                success: true,
                message: "Author logged in successfully",
                role: 'author',
                user: req.session.user,
            })
        }else {
            console.log("User logged in:", user.username);
            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                role: 'user',
                user: req.session.user,
            })  
        }
    } catch (err) {
        console.log("Error in loginUser function:", err);
        res.status(500).json({ error: err.message });
    }
}

//----------- Logout User -----------
export const logoutUser = (req, res) => {
    try {
        if(!req.session.user) {
            return res.status(400).json({ message: "No user is logged in" });
        }
        // Destroy session
        req.session.destroy((err) => {
            if(err) {
                console.log("Error destroying session:", err);
                return res.status(500).json({ message: "Error logging out" });
            }
            // Clear cookie
            res.clearCookie("connect.sid");
            console.log("User logged out successfully");
            res.status(200).json({succces: true, message: "User logged out successfully" });
        })
    } catch (err) {
        console.log("Error in logoutUser function:", err);
        res.status(500).json({ error: err.message });
    }
}