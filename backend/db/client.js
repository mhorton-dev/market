import pg from "pg";

dotenv.config();

const db = new pg.Client(process.env.DATABASE_URL);
import dotenv from "dotenv";
export default db;
