const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  if (statusCode == 500) {
    res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
  }

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({ title: "Validation Error", message: err.message, stackTrace: err.stack });
      break;
    case constants.NOT_FOUND:
      res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
      break;
    case constants.UNAUTHORIZED:
      res.json({ title: "UNAUTHORIZED", message: err.message, stackTrace: err.stack });
      break;
    case constants.FORBIDDEN:
      res.json({ title: "FORBIDDEN", message: err.message, stackTrace: err.stack });
      break;
    case constants.SERVER_ERROR:
      res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
      break;
    default:
        res.status(statusCode).json({ title: "Internal Server Error", message: err.message, stackTrace: err.stack });
      break;
  }
};

module.exports = errorHandler;
