class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public privateMessage: string,
  ) {
    super(message);
  }
}

export default CustomError;
