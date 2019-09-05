import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const ExampleSchema = Joi.object()
  .required()
  .keys({
    example: Joi.string()
  });
