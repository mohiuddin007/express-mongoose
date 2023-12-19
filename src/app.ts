import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/globalErrorHandlers";
import router from "./routes";
import notFound from "./middlewares/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(cookieParser());

//application routes
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the web course backend");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
