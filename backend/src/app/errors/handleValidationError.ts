import mongoose from 'mongoose';

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorMessage =
    Object.values(err.errors)[0].value + ' is not a valid ID!';
  // Object.values(err.errors)
  //   .map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
  //     return value.message;
  //   })
  //   .join(', ');

  const statusCode = 400;

  return {
    statusCode,
    message: 'Mongoose Validation failure',
    errorMessage,
  };
};
