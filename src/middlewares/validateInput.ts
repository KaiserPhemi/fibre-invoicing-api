// third-party libraries
import { Request, Response, NextFunction } from 'express';

// services
import validationService from '../services/validationService';

/**
 * Validates user input
 */
const validateInput = {
  /**
   * Validates input to add user
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
  async addUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const checkInput = await validationService.addUser.validate({
      ...req.body
    });
    if (!checkInput.error) {
      next();
    }
    else {
      return res
        .status(400)
        .json({
          message: 'Invalid input.',
          error: checkInput.error.details[0].message || "Invalid Input"
        })
    }
  }
}

export default validateInput;
