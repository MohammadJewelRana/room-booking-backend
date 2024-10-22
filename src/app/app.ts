import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes';
import globalErrorHandler from './errors/globalErrorHandler';
import notFound from './errors/notFound';

const app: Application = express();

const corsOptions = {
  origin: [
    'http://localhost:3000', // Localhost for development
    'https://room-booking-psi.vercel.app', // Your Vercel deployed client
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(express.json());
app.use(cors(corsOptions));
// app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.options('*', cors(corsOptions));
app.use(express.text());
app.use(cookieParser());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: ' Room booking app is running into the server!!!',
  });
});

//global error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;
