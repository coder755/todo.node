import User from '../models/User';

export const findUser = (userId: string) => {
  const user = new User();
  user.externalId = userId;
  return user;
};

export const NO_OP = () => {};
