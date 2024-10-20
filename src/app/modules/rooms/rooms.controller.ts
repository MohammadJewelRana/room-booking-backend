import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RoomServices } from './rooms.service';

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.createRoomIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is created successfully',
    data: result,
  });
});

const getAllRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.getAllRoomFromDB();
  // console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Room retrieved successfully',
    data: result,
  });
});

const getSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  const result = await RoomServices.getSingleRoomFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Room retrieved successfully',
    data: result,
  });
});

const deleteSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.deleteSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Room deleted successfully',
    data: result,
  });
});

const updateSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await RoomServices.updateSingleUserFromDB(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Room updated successfully',
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  getAllRoom,
  getSingleRoom,
  deleteSingleRoom,
  updateSingleRoom,
};
