import { ZodError, ZodIssue } from 'zod';

export const handleZodError = (err: ZodError) => {
  const errorMessage = err.issues
    .map((issue: ZodIssue) => {
      return issue?.path[issue?.path.length - 1] + ' is ' + issue.message;
    })
    .join(', ');

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod Validation failure',
    errorMessage,
  };
};
