import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  // console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All User retrieved successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  const result = await UserServices.getSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User retrieved successfully',
    data: result,
  });
});

const deleteSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User deleted successfully',
    data: result,
  });
});

const updateSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await UserServices.updateSingleUserFromDB(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' User updated successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUserFromDB(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none', //frontend and backend different domain
    maxAge: 1000 * 60 * 60 * 24 * 365, //cookie token set for 1 year
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully',
    data: { accessToken, refreshToken },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  // console.log(refreshToken);

  const result = await UserServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'access token retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  loginUser,
  refreshToken,
};
