import { sql } from "../config/db.js";
// check if user is authenticated
export const isAuthenticated = (req, res, next) => { 
    if(!req.session.user) { 
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}

// check user or admin
export const isAdmin = (req, res, next) => { 
    if(!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if(req.session.user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
}

// check author or admin
export const isAuthorOrAdmin = async (req, res, next) => {
    if(!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.session.user.id;
    const userRole = req.session.user.role;
    // admin có toàn quyền
    if(userRole === 'admin') {
        return next();
    }

    // check author
    if(userRole !== 'author') {
        return res.status(403).json({ message: "Forbidden: Authors only" });
    }

    // check user have author profile or not
    try {
        const authorPorfile = await sql`SELECT * FROM authors WHERE user_id = ${userId}`;
        if(authorPorfile.length === 0) {
            return res.status(403).json({ message: "Forbidden: Author profile not found" });
        }
        next();
    } catch (err) {
        console.log("Error checking author profile", err);
        res.status(500).json({ error: err.message });
    }
}

export const isAuthor = (req, res, next) => { 
    if(!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userRole = req.session.user.role;
    if(userRole !== 'author' && userRole !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Authors only" });
    }
    next();
}