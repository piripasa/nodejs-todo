import json from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connections, defaultConnection } from './config/database.mjs';
import { __connect } from './db/db.mjs';
import { todoRoute } from './routes/todo.mjs';
import { default as userRoute } from './routes/user.mjs';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

// Routes
app.get('/', (req, res) => {
    res.send('We are on HomePage');
});

// register the route
userRoute(app);
todoRoute(app);

try {
    __connect(connections[defaultConnection].url);
} catch (except) {
    console.log("Error during connection to the database:");
    console.error(except);
    process.exit(1);
}

app.listen(3000);