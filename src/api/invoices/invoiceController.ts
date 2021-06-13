// third-party libraries
import { Request, Response } from 'express';

// services
import invoiceService from '../../services/invoiceService';
import transactionService from '../../services/transactionService';

// helpers
import formatArr from '../../helpers/formatArray';

/**
 * 
 */
const invoiceController = {
  /**
   * Fetch all invoices
   * @param req 
   * @param res 
   * @returns 
   */
  async getAllInvoices(req: Request, res: Response): Promise<any> {
    try {
      const invoices = await invoiceService.getAllInvoices();
      return res
        .status(200)
        .json({
          message: 'All invoices fetched',
          invoices,
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
   * Adds an invoice
   * @param req 
   * @param res 
   * @returns 
   */
  async addInvoice(req: Request, res: Response): Promise<any> {
    const { userId } = req.decoded;
    const { name, transactions } = req.body;
    try {
      let invoice = await invoiceService.addInvoice(userId, name);
      invoice = invoice[0];
      const invoiceId = invoice.id;
      const formattedArr = formatArr(transactions, invoiceId);
      const addedTranx = await transactionService.addTransaction(formattedArr);
      return res
        .status(201)
        .json({
          message: "Invoice added",
          invoiceId,
          invoiceTitle: invoice.name,
          paid: invoice.paid,
          invoiceItems: addedTranx
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
   * Fetch a single invoice
   * @param req 
   * @param res 
   */
  async getInvoice(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const invoice = await invoiceService.getInvoice(id);
      return res
        .status(200)
        .json({
          message: "Invoice fetched.",
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
   * Sends an invoice to clients
   * @param req 
   * @param res 
   * @returns 
   */
  async sendInvoice(req: Request, res: Response): Promise<any> {
    try {
      return res
        .status(201)
        .json({
          message: "Invoice sent",
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

export default invoiceController;
