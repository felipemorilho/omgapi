import express from 'express';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';

const app = express();

connectDB();

routes(app);

app.use(errorMiddleware);

export default app;
