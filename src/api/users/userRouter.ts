// third-party libraries
import express from 'express';

// controllers
import userController from './userController';

// middlewares
import validateInput from '../../middlewares/validateInput';
import checkAuth from '../../middlewares/auth';

// router
const userRouter = express.Router();

// routes
userRouter
  .route('/')
  .get(checkAuth.verifyLogin, userController.getAllUsers)
  .post(validateInput.addUser, userController.addUser);
userRouter
  .route('/login')
  .post(validateInput.userLogin, userController.userLogin);

export default userRouter;
