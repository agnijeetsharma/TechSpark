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
        if (err instanceof apiError) {           //sending custom json error message here
         
          return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
          });
        } else {
          
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        }
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
