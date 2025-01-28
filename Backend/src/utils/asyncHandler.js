import { apiError } from "./apiErrors.js";

// method--1

// const asyncHandler = (requestHandler) => {
//   return (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//   };
// };
// method-3
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
      .catch((err) => {
        // Handling custom apiError
        if (err instanceof apiError) {
          return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors, // Custom errors from your apiError class
          });
        }

        // Handling Mongoose ValidationError
        if (err.name === 'ValidationError') {
          const validationErrors = Object.values(err.errors).map(
            (error) => error.message
          );
          return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: validationErrors, // Send validation error messages
          });
        }

        // Handling other errors (server or unknown)
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error',
          data: err, // Sending the error data for debugging
        });
      });
  };
};


//   method ---2
// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (err) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

export default asyncHandler;
