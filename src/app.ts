import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import router from './app/router';
import { notFound } from './app/middleware/notFound';
import 'dotenv/config'
import { envVars } from './app/envConfig';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

app.use(cors({ origin: ["https://guide-mate-frontend.vercel.app", "http://localhost:3000"] }));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", router);

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "Server is running..",
        environment: envVars.PORT,
        uptime: process.uptime().toFixed(2) + " sec",
        timeStamp: new Date().toISOString()
    })
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;