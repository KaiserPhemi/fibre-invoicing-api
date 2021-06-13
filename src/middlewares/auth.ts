// third-party libraries
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


/**
 * Verifies token
 */
const checkAuth = {
  /**
   * Checks if user is logged in an token valid
   * @param req 
   * @param res 
   * @param next 
   */
  async verifyLogin(req: any, res: Response, next: NextFunction): Promise<any> {
    let token: any = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token || token === undefined) {
      return res
        .status(401)
        .json({
          message: 'Unauthorized access. Please login.'
        })
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
          return res
            .status(400)
            .json({
              message: "Invalid token.",
              error: err
            })
        }
        req.decoded = decoded;
        next();
      })
    } catch (error) {
      return res
        .status(500)
        .json({
          message: 'Internal server error',
          error,
        });
    }
  }
}

export default checkAuth;
