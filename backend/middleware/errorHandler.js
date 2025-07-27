import mongoose from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log error for debugging

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      error: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  // Mongoose CastError (e.g., invalid ObjectID)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      error: 'Invalid ID',
      details: `Invalid ${err.path}: ${err.value}`
    });
  }

  // Other errors
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
};