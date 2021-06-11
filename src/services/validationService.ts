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
  })
}

export default validationService;
