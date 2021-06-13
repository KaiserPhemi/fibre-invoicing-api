// database 
import db from '../../knex/knex';

/**
 * Invoice service
 */
const invoiceService = {
  /**
   * Adds an invoice
   * @param userId 
   * @param name 
   */
  async addInvoice(userId: number, name: string): Promise<any> {
    try {
      const invoice = await db.insert({
        name,
        user_id: userId
      })
        .into("invoices")
        .returning("*");
      return invoice;
    } catch (error) {
      return error;
    }
  },
  /**
   * Fetches all invoices
   * @returns 
   */
  async getAllInvoices(): Promise<any> {
    try {
      const invoices = await db.select("*").from("invoices");
      return invoices
    } catch (error) {
      return error
    }
  },

  /**
   * Updates an invoice status
   * @param id 
   * @param paid 
   * @returns 
   */
  async updateInvoice(id: number, paid: boolean): Promise<any> {
    try {
      const updatedInvoice = await db.update({ paid }).where({ id }).returning(["name", "paid"]);
      return updatedInvoice;
    } catch (error) {
      return error
    }
  },

  /**
   * fetch an invoice
   * @param id 
   * @returns 
   */
  async getInvoice(id: number): Promise<any> {
    try {
      const invoice = await db.select("*").from("invoices").where({ id });
      return invoice;
    } catch (error) {
      return error;
    }
  }
}

export default invoiceService;
