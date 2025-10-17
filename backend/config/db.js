import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url";
dotenv.config();


// Giúp Node hiểu được đường dẫn tương đối
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load .env từ thư mục gốc dự án (ra khỏi backend)
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env
//create a SQL connection using our env variables
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

//this sql function we export is used as a tagged tamplete literal, which allows us to write SQL queries safely
// psql 'postgresql://neondb_owner:npg_JRazGkYO6g2Z@ep-billowing-bush-adwa89xj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'