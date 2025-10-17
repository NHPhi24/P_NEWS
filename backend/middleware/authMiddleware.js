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

    // Admin có toàn quyền
    if(userRole === 'admin') {
        return next();
    }
    
    // Kiểm tra author
    if(userRole !== 'author') {
        return res.status(403).json({ message: "Forbidden: Authors or Admins only" });
    }

    // Nếu có newsID trong params (cho route edit/delete news cụ thể)
    const { newsID } = req.params;
    if (newsID) {
        try {
            // check if the author owns the news
            const news = await sql`SELECT * FROM news WHERE id = ${newsID} AND author_id IN (SELECT id FROM authors WHERE user_id = ${userId})`;
            if(news.length === 0) {
                return res.status(404).json({ message: "News not found or access denied" });
            }
        } catch (err) {
            console.log("Error in isAuthorOrAdmin middleware:", err);
            return res.status(500).json({ error: err.message });
        }
    }
    
    // Cho dashboard routes (không có newsID) - author có thể truy cập
    next();
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