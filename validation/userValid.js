import Joi from 'joi';
import messageUtil from '../utilities/message.js';
import Response from '../utilities/Response.js';
class userValidation {
  signup = (req, res, next) => {
    try {
      const schema = Joi.object({
        first_name: Joi.string().required().messages({
          'string.base': messageUtil.FIRSTNAME_STRING_BASE,
          'string.empty': messageUtil.FIRSTNAME_STRING_EMPTY,
          'any.required': messageUtil.FIRSTNAME_REQUIRED,
        }),
        last_name: Joi.string().required().messages({
          'string.base': messageUtil.LASTNAME_STRING_BASE,
          'string.empty': messageUtil.LASTNAME_STRING_EMPTY,
          'any.required': messageUtil.LASTNAME_REQUIRED,
        }),
        // postal_code: Joi.string().required().messages({
        //   'string.base': messageUtil.POSTALCODE_STRING_BASE,
        //   'string.empty': messageUtil.POSTALCODE_STRING_EMPTY,
        //   'any.required': messageUtil.POSTALCODE_REQUIRED,
        // }),
        email: Joi.string().email().required().messages({
          'string.base': messageUtil.EMAIL_STRING_BASE,
          'string.empty': messageUtil.EMAIL_STRING_EMPTY,
          'string.email': messageUtil.EMAIL_NOT_VALID,
          'any.required': messageUtil.EMAIL_REQUIRED,
        }),
        password: Joi.string().required().messages({
          'string.base': messageUtil.PASSWORD_STRING_BASE,
          'string.empty': messageUtil.PASSWORD_STRING_EMPTY,
          'any.required': messageUtil.PASSWORD_REQUIRED,
        }),
      });
      const error = schema.validate(req.body);
      if (error) {
        return Response.badRequest(
          res,
          error.details ? error.details[0].messages : error.message
        );
      }
      next();
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  login = (req, res, next) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required().messages({
          'string.base': messageUtil.EMAIL_STRING_BASE,
          'string.empty': messageUtil.EMAIL_STRING_EMPTY,
          'string.email': messageUtil.EMAIL_NOT_VALID,
          'any.required': messageUtil.EMAIL_REQUIRED,
        }),
        password: Joi.string().required().messages({
          'string.base': messageUtil.PASSWORD_STRING_BASE,
          'string.empty': messageUtil.PASSWORD_STRING_EMPTY,
          'any.required': messageUtil.PASSWORD_REQUIRED,
        }),
      });
      const { error } = schema.validate(req.body);
      // send response
      if (error) {
        return Response.badRequest(
          res,
          error.details ? error.details[0].message : error.message
        );
      }
      next();
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
}
export default new userValidation();
