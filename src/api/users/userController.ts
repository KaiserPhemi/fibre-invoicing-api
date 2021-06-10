// third-party libraries
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// services
import userService from '../../services/userService';

/**
 * User controller
 */
const userController = {
  /**
   * Fetches all users
   * @param req 
   * @param res 
   * @returns 
   */
  async getAllUsers(req: Request, res: Response): Promise<any> {
    try {
      const allUsers = await userService.getAllUsers();
      return res
        .status(200)
        .json({
          message: "All users fetched",
          users: allUsers,
        })
    } catch (error) {
      return res
        .status(500)
        .json({
          message: 'Internal server error',
          error,
        });
    }
  },

  /**
   * Register a user on the app
   * @param req 
   * @param res 
   */
  async addUser(req: Request, res: Response): Promise<any> {
    const { name, email, password, companyName } = req.body;
    try {
      const existingUser = await userService.getUserByEmail(email);
      if (existingUser.length > 0) {
        return res
          .status(400)
          .json({
            message: 'User already exist'
          })
      }
      const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const addedUser = await userService.addUser(name, email, passwordHash, companyName);
        // add user to table

    } catch (error) {
      return res
        .status(500)
        .json({
          message: 'Internal server error',
          error,
        });
    }
  },

  /**
   * User login
   * @param req 
   * @param res 
   */
  async userLogin(req: Request, res: Response): Promise<any> { }
}

export default userController;
