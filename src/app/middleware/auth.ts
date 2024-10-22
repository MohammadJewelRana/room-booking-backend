import jwt, { JwtPayload } from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
 
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.constant';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers.authorization);

    //token comes or not from frontend
    const token = req.headers.authorization; //get from header
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'you are unauthorized user!!',
      );
    }

    //verify token
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are unauthorized');
    }

    //get data from token decoded
    const { role, userId } = decoded;

    //validations
    const isUserExists = await User.findOne({ _id: userId }).select('+password');
    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
    }
    if (isUserExists?.isDeleted === true) {
      throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
    }
    if (isUserExists?.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
    }

    //old token expire if password change then create new token
    // const isJWTIssuedBeforePasswordChanged = (
    //   passwordChangedTimeStamp: Date,
    //   jwtIssuedTimestamp: number,
    // ) => {
    //   //convert in mili second like jwt issued timestamp
    //   const passwordChangedTime =
    //     new Date(passwordChangedTimeStamp).getTime() / 1000;
    //   return passwordChangedTime > jwtIssuedTimestamp;
    // };
    // if (
    //   isUserExists.passwordChangedAt &&
    //   isJWTIssuedBeforePasswordChanged(
    //     isUserExists.passwordChangedAt,
    //     iat as number,
    //   )
    // ) {
    //   throw new AppError(httpStatus.FORBIDDEN, 'you are not authorized!!');
    // }

    //authorization check from route
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'you are not  authorized user!!',
      );
    }
    req.user = decoded as JwtPayload;
    next(); //go to next middleware
  });
};

export default auth;
