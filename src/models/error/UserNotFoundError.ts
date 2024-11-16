class UserNotFoundError extends Error {
  constructor(message: string = '') {
    if (message) {
      super(`User not found: ${message}`);
    } else {
      super('User not found');
    }
  }
}

export default UserNotFoundError;
