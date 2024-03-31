const errorHandler = (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  };
  