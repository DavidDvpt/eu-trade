import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";

const app: Express = express();

app.use(morgan("dev"));
app.use(helmet());

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;