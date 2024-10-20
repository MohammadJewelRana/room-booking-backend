import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import { createToken } from './user.utils';

//user create
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

//get all user
const getAllUserFromDB = async () => {
  const result = await User.find({ isDeleted: false });
  return result;
};

//get single user
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

// delete single user
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

//update single user
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

const loginUserFromDB = async (payload: Partial<TUser>) => {
 
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Please provide login data');
  }

  const isUserExists = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  //   console.log(isUserExists);

  if (
    !isUserExists ||
    isUserExists?.isDeleted === true ||
    isUserExists?.status === 'blocked'
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  //check password is correct
  const isPasswordMatched =await bcrypt.compare(
    payload?.password as string,
    isUserExists?.password
  );
  // console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, '    password does not match  ');
  }

  //create token and sent to client
  const jwtPayload = {
    userId: isUserExists.id,
    name: isUserExists.name,
    email: isUserExists.email,
    role: isUserExists.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // console.log(token);

  //verify token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
  // console.log(decoded);

  //get data from token decoded
  const { userId } = decoded;

  //validations
  const isUserExists = await User.findOne({ _id: userId }).select('+password');
  // console.log(isUserExists);

  if (
    !isUserExists ||
    isUserExists?.isDeleted === true ||
    isUserExists?.status === 'blocked'
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  //create token and sent to client
  const jwtPayload = {
    userId: isUserExists.id,
    name: isUserExists.name,
    email: isUserExists.email,
    role: isUserExists.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserFromDB,
  loginUserFromDB,
  refreshToken,
};
