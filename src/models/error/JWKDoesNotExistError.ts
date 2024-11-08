class JWKDoesNotExistError extends Error {
  constructor(message: string = '') {
    if (message) {
      super(`JWK Does Not Exist: ${message}`);
    } else {
      super('JWK Does Not Exist');
    }
  }
}

export default JWKDoesNotExistError;
