// third-party libraries
import Joi from 'joi';

const validationService = {
  /**
   * Add user
   */
  addUser: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().min(8).required(),
    companyName: Joi.string().required(),
  }),

  /**
   * validates login data
   */
  userLogin: Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().min(8).required(),
  }),

  /**
   * Adsding an invoice
   */
  addInvoice: Joi.object({
    name: Joi.string().required(),
    paid: Joi.boolean(),
    transactions: Joi.array().required()
      .items({
        itemName: Joi.string().required(),
        itemPrice: Joi.number().required(),
      }).min(1).required(),
  })

}

export default validationService;
