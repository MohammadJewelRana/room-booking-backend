/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
 

const createUserIntoDB = async (payload: Partial<TUser>) => {
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found');
  }

  const result = await User.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create an user!!');
  }

  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find({ isDeleted: false });
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'please give user id');
  }
  const result = await User.findOne({ _id: userId, isDeleted: false });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user not found');
  }
  return result;
};

const deleteSingleUserFromDB = async (userId: string) => {
  if (!userId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide a valid user ID',
    );
  }

  const result = await User.findByIdAndUpdate(
    userId,
    { $set: { isDeleted: true } },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user!');
  }

  return result;
};

const updateSingleUserFromDB = async (
  userId: string,
  payload: Partial<TUser>,
) => {
  if (!userId || !payload) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide user ID and data',
    );
  }

  const modifiedUpdatedData: Record<string, unknown> = {
    ...payload,
  };

  const result = await User.findByIdAndUpdate(
    userId,
    { $set: modifiedUpdatedData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update user!');
  }

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserFromDB,
};
