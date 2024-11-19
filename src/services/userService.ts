import { v7 as uuidv7 } from 'uuid';
import UserEntity from '../data/entity/User';
import { userRepository } from '../data';
import { User as UserModel } from '../models/User';
import { PostUserRequest } from '../models/requests/PostUserRequest';
import UserNotFoundError from '../models/error/UserNotFoundError';

const convertUuidToBinary = (uuid: string) => Buffer.from(uuid.replace(/-/g, ''), 'hex');

const userRequestToEntity = (req: PostUserRequest) => {
  const entity = new UserEntity();
  const id = uuidv7();
  entity.Id = convertUuidToBinary(id);
  entity.ExternalId = id;
  entity.UserName = req.userName;
  entity.FirstName = req.firstName;
  entity.FamilyName = req.familyName;
  entity.Email = req.email;

  return entity;
};

const convertBinaryToUuid = (buffer: Buffer): string => {
  if (buffer.length !== 16) {
    throw new Error('Invalid binary UUID length. Expected 16 bytes.');
  }

  const hex = Buffer.from(buffer).toString('hex');
  return `${hex.substring(0, 8)}-${hex.substring(8, 4)}-${hex.substring(12, 4)}-${hex.substring(16, 4)}-${hex.substring(20)}`;
};

const userEntityToModel = (entity: UserEntity) => {
  const id = convertBinaryToUuid(entity.Id);
  const userModel: UserModel = {
    id,
    userName: entity.UserName,
    firstName: entity.FirstName,
    familyName: entity.FamilyName,
    email: entity.Email,
    createdDate: entity.CreatedDate,
  };
  return userModel;
};

export const createUser = async (req: PostUserRequest) => {
  const entity = userRequestToEntity(req);
  const createdEntity = userRepository.create(entity);
  const savedEntity = await userRepository.save(createdEntity);
  return savedEntity;
};

export const findUser = async (userId: string): Promise<UserModel> => {
  const binId = convertUuidToBinary(userId);
  const user = await userRepository.findOne({
    where: {
      Id: binId,
    },
  });
  if (user === null) {
    throw new UserNotFoundError();
  }
  const userModel = userEntityToModel(user);
  return userModel;
};

export const NO_OP = () => {};
