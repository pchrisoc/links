import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { handler } from './build/handler.js';
dotenv.config({ path: './config/.env' });

const app = express();
app.use(cors());

connectDB();

import indexRouter from './routes/index.js';
import urlsRouter from './routes/urls.js';

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/link', indexRouter);
app.use('/api', urlsRouter);
app.use('/', handler);

// Server Setup
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
