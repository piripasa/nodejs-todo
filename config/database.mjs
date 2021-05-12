export const defaultConnection = 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

export const connections = {
    mongodb: {
        url: process.env.DB_CONNECTION
    }
}