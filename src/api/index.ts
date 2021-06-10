// third-party libraries
import express from 'express';

// routers
import userRouter from './users/usersRouter';
const mainRouter = express.Router();

//routes
mainRouter.use('/users', userRouter);

export default mainRouter;