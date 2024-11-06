class apiError extends Error {
  constructor(
    statusCode,
    message = "somthing went wrong",
    Errors = [],
    // stack = "",
  ) {
    super(message)
    this.statusCode = statusCode,
      this.data = null,
      this.message = message,
      this.success = false,
      this.Errors = Errors;
  }
}

export default apiError