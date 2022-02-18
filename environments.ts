import dotenv from "dotenv";

export const environments = {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DATABASE,
    JWT_SECRET: process.env.JWT_SECRET || ""
}

dotenv.config();