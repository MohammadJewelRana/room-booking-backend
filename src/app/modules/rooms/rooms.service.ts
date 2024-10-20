import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TRooms } from './rooms.interface';
import { Room } from './rooms.model';

//room create
const createRoomIntoDB = async (payload: TRooms) => {
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found');
  }

  const result = await Room.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a room!!');
  }

  return result;
};

//get all room
const getAllRoomFromDB = async () => {
  const result = await Room.find({ isDeleted: false });
  return result;
};

//get single room
const getSingleRoomFromDB = async (roomId: string) => {
  if (!roomId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'please give room id');
  }
  const result = await Room.findOne({ _id: roomId, isDeleted: false });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'room not found');
  }
  return result;
};

// delete single room
const deleteSingleUserFromDB = async (roomId: string) => {
  if (!roomId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide a valid room ID',
    );
  }

  const result = await Room.findByIdAndUpdate(
    roomId,
    { $set: { isDeleted: true } },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete room!');
  }

  return result;
};

//update single room
const updateSingleUserFromDB = async (
  roomId: string,
  payload: Partial<TRooms>,
) => {
  if (!roomId || !payload) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide room ID and data',
    );
  }
  const { ...remainingData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  };

  const result = await Room.findByIdAndUpdate(
    roomId,
    { $set: modifiedUpdatedData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update room!');
  }

  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomFromDB,
  getSingleRoomFromDB,
  deleteSingleUserFromDB,
  updateSingleUserFromDB,
};
