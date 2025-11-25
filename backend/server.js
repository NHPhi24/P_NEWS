import express from "express"
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import session from 'express-session'
import { initDB } from "./config/initDB.js"
import { sql } from "./config/db.js"
import {aj} from "./lib/arcjet.js"

//routes
import newsRoutes from './routes/newsRoutes.js'
import authRoutes from "./routes/authRoutes.js"
import usersRouter from "./routes/usersRouter.js"
import authorsRouter from "./routes/authorsRouter.js"
import categoriesRouter from "./routes/categoriesRouter.js"
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js"
import authorDashboardRoutes from "./routes/authorDashboardRoutes.js"

dotenv.config(); 
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(helmet({
    contentSecurityPolicy:false, //increase security header 
}))
app.use(morgan("dev")); //log the requests

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
); //allow frontend access backend

//config session 
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false, //không lưu phiên khi có sự thay đổi
        saveUninitialized: false, //Không lưu phiên khi chưa dữ liệu
        httpOnly: true,
        cookie: { 
            httpOnly: true, // bảo mật: cookie không bị JS đọc
            maxAge: 1000 * 60 * 60 * 24, // 1 ngày
        }, // 1 day
    })
)
// arcjet
// app.use(async (req, res, next) => {
//     try {
//         const decision = await aj.protect(req, {
//             requested: 1, // specifies that each request consumes 1 token
//         });

//         if (decision.isDenied()) {
//             if (decision.reason.isRateLimit()) {
//                 res.status(429).json({ error: "Too Many Requests" });
//             } else if (decision.reason.isBot()) {
//                 res.status(403).json({ error: "Bot access denied" });
//             } else {
//                 res.status(403).json({ error: "Forbidden" });
//             }
//             return;
//         }

//         // check for spoofed bots
//         if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
//             res.status(403).json({ error: "Spoofed bot detected" });
//             return;
//         }

//         next();
//     } catch (error) {
//         console.log("Arcjet error", error);
//         next(error);
//     }
// });

app.use("/api/news",  newsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/categories", categoriesRouter);
// dashboard routes
app.use("/api/dashboard/admin", adminDashboardRoutes)
app.use("/api/dashboard/author", authorDashboardRoutes)

initDB().then(() => {
    app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}/api`)
})
})
