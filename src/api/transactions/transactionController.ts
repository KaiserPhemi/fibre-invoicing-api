// third-party libraries
import { Request, Response } from 'express';

// services
import transactionService from '../../services/transactionService';

/**
 * 
 */
const transactionCtrl = {
  /**
   * Adds a transaction
   * @param req 
   * @param res 
   */
  async addTransaction(req: Request, res: Response): Promise<any> {
    // get invoice id
    // add transactions
  },

  /**
   * Fetches all transactions in the system
   * @param req 
   * @param res 
   */
  async getAllTransactions(req: Request, res: Response): Promise<any> {
    try {
      const transactions = await transactionService.getAllTransactions();
      if (transactions.length === 0) {
        return res
          .status(404)
          .json({
            message: "No transactions."
          });
      }
      return res
        .status(200)
        .json({
          message: "All transactions fetched.",
          transactions
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


export default transactionCtrl;
