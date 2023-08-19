import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
dotenv.config()

export const msAuthenticator = new Sequelize(
    process.env.DB_MS_AUTHENTICATOR,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        port: Number.parseInt(process.env.DB_MS_AUTHENTICATOR_PORT), 
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
)

export const msChiper = new Sequelize(
    process.env.DB_MS_CHIPER,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        port: Number.parseInt(process.env.DB_MS_CHIPER_PORT), 
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
)
