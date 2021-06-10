// third-party libraries
import express from 'express';

// router
const userRouter = express.Router();

// routes
userRouter
  .route('/')
  .get(() => {

    console.log('we got here')
  })


export default userRouter;