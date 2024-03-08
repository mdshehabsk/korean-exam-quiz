import mongoose from 'mongoose';

export const handleCastError = (err: mongoose.Error.CastError) => {
  const errorMessage = err.value + ' is not a valid ID!';

  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast Error Invalid ID',
    errorMessage,
  };
};
