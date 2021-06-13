export { };
// third-party libraries
import express from 'express';

// controller
import transactionCtrl from './transactionController';
import checkAuth from '../../middlewares/auth';

// router
let transactionRouter = express.Router();

// routes
transactionRouter.route('/')
  .get(checkAuth.verifyLogin, transactionCtrl.getAllTransactions);


export default transactionRouter;

