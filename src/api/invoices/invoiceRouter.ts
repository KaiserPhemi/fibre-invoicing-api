// third-party libraries
import express from 'express';

// controllers
import invoiceController from './invoiceController';

// middlewares
import validateInput from '../../middlewares/validateInput';
import checkAuth from '../../middlewares/auth';

// router
const invoiceRouter = express.Router();

// routes
invoiceRouter
  .route('/')
  .get(checkAuth.verifyLogin, invoiceController.getAllInvoices)
  .post(checkAuth.verifyLogin, validateInput.addInvoice, invoiceController.addInvoice);
invoiceRouter
  .route('/:id')
  .get(checkAuth.verifyLogin, invoiceController.getInvoice);
invoiceRouter
  .route("/send")
  .post(checkAuth.verifyLogin, invoiceController.sendInvoice);

export default invoiceRouter;
