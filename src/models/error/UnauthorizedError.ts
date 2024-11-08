class UnauthorizedError extends Error {
  constructor(message: string = '') {
    if (message) {
      super(`Unauthorized Access: ${message}`);
    } else {
      super('Unauthorized Access');
    }
  }
}

export default UnauthorizedError;
