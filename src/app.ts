// third-party libraries
import errorhandler from "errorhandler";
import express, { Application, Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import swaggerUI from 'swagger-ui-express';
import apiDocs from './docs/swagger.json';

// routes
import mainRouter from './api/index';

const { urlencoded, json } = express;
const isProduction = process.env.NODE_ENV === "production";

// Create global app Objects
const app: Application = express();

// Normal express config defaults
app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(urlencoded({ extended: false }));
app.use(json());
if (!isProduction) {
  app.use(errorhandler());
}

// base routes
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(apiDocs))
app.use('/api', mainRouter)
app.use('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: `Server is running on port: ${process.env.PORT}`,
  });
});
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (!isProduction) {
  // eslint-disable-next-line no-unused-vars
  app.use((err: any, req: Request, res: Response) => {
    // eslint-disable-next-line no-console
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

/**
 * Production error handler
 */
app.use((err: any, req: Request, res: Response) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

export default app;
