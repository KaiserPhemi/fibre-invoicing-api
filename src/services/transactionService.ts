// database 
import db from '../../knex/knex';

/**
 * 
 */
const transactionService = {
  /**
   * Fecth all transactions
   * @returns 
   */
  async getAllTransactions(): Promise<any> {
    try {
      const allTransactions = await db.select("*").from("transactions");
      return allTransactions;
    } catch (error) {
      return error
    }
  },

  /**
   * Add transaction(s)
   * @param newTransactions
   * @returns 
   */
  async addTransaction(
    newTransactions: any[]
  ): Promise<any> {
    try {
      const transaction = await db.insert(newTransactions)
        .into("transactions")
        .returning("*");
      return transaction;
    } catch (error) {
      return error
    }
  },

  /**
   * Fetch transactions by invoice id
   * @param invoiceId
   */
  async getTransactionsByInvoiceId(invoiceId: number): Promise<any> {
    try {
      const allTransactions = await db.select("*").from("transactions").where({ invoice_id: invoiceId })
      return allTransactions;
    } catch (error) {
      return error;
    }
  }
}

export default transactionService;
