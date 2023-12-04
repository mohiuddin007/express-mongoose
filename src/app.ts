import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./modules/student/student.route";
import { UserRoutes } from "./modules/user/user.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandlers";
import router from "./routes";
import notFound from "./middlewares/notFound";

const app: Application = express();

app.use(express.json());
app.use(cors());

//application routes
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the web course backend");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
