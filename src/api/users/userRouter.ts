// third-party libraries
import express from 'express';

// controllers
import userController from './userController';

// middlewares
import validateInput from '../../middlewares/validateInput';

// router
const userRouter = express.Router();

// routes
userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(validateInput.addUser, userController.addUser);

userRouter
  .route('/login')
  .post(userController.userLogin);

export default userRouter;