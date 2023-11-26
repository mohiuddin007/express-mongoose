import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.route';
import { UserRoutes } from './modules/user/user.route';
import { globalErrorHandler } from './middlewares/globalErrorHandlers';
import router from './routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/users', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler);

export default app;