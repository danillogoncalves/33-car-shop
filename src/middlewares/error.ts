import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErrorTypes } from '../errors/catalog';

const error: ErrorRequestHandler = (
  err: Error | ZodError,
  _req,
  res,
  _next,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues[0].message });
  }
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ message });
  }
  return res.status(500).json({ message: 'Internal error' });
};

export default error;
