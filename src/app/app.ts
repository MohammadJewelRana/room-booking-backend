import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes';
import globalErrorHandler from './errors/globalErrorHandler';
import notFound from './errors/notFound';

const app: Application = express();

app.use(express.json());

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.text());
app.use(cookieParser());

app.use('/api', router);  

//global error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;
