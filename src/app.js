import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';

const app = express();

connectDB();

app.use(cors());

routes(app);

app.use(errorMiddleware);

export default app;
