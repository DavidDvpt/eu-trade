import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";

const app: Express = express();

app.use(morgan("dev"));
app.use(helmet());

app.use("/api/v1", routes);

export default app;
