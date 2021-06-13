
// third-party libraries
import express from 'express';
const mainRouter = express.Router();

// routers
import userRouter from './users/userRouter';
import invoiceRouter from './invoices/invoiceRouter';
import transactionRouter from './transactions/transactionRouter';

//routes
mainRouter.use('/transactions', transactionRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/invoices', invoiceRouter);

export default mainRouter;
