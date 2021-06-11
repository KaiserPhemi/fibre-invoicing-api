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
      return res
        .status(201)
        .json({
          message: 'User registered',
          user: addedUser
        });
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
  async userLogin(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser.length === 0) {
      return res
        .status(400)
        .json({
          message: 'Email/password is invalid.'
        })
    }
    const userObject = existingUser[0];
    const passwordMatch = await bcrypt.compare(password, userObject.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({
          message: 'Email/password is invalid.'
        })
    }
    const jwtToken = jwt.sign(
      {
        email: userObject.email,
        userId: userObject.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' });
    return res
      .status(200)
      .json({
        message: 'User logged in successfully',
        token: jwtToken,
        expiresIn: 3600,
        user: {
          name: userObject.name,
          email: userObject.email,
          company: userObject.company_name
        }
      });
  }
}

export default userController;
