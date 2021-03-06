// database 
import db from '../config/knex';

/**
 * User service
 */
const userService = {

  /**
   * Fetches all users
   * @returns 
   */
  async getAllUsers(): Promise<any> {
    try {
      const users = await db.select("*").from("users_table");
      return users;
    } catch (error) {
      return error
    }
  },

  /**
   * Fectch user by email
   * @param email 
   * @returns 
   */
  async getUserByEmail(email: string): Promise<any> {
    try {
      const existingUser = await db.select("*").from("users_table").where({ email });
      return existingUser;
    } catch (error) {
      return error
    }
  },

  /**
   * Add a user to the table
   * @param name 
   * @param email 
   * @param password 
   * @param companyName 
   * @returns 
   */
  async addUser(name: string, email: string, password: string, companyName: string): Promise<any> {
    try {
      const user = await db.insert({
        name,
        email,
        password,
        company_name: companyName
      })
        .into("users_table")
        .returning(["name", "email", "company_name"]);
      return user
    } catch (error) {
      return error
    }
  }
}

export default userService;
