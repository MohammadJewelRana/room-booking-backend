import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

//Booking create
const createBookingIntoDB = async (payload: TBooking) => {
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found');
  }

  if (payload.dates.startDate >= payload.dates.endDate) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Start date must be before the end date.',
    );
  }

  // Check for existing bookings that overlap with the provided dates
  const conflictingBookings = await Booking.find({
    roomId: payload.roomId,
    isDeleted: false,
    $or: [
      {
        'dates.startDate': { $lte: payload.dates.endDate },
        'dates.endDate': { $gte: payload.dates.startDate },
      },
    ],
  });

  if (conflictingBookings.length > 0) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Room is already booked for the selected dates.',
    );
  }

  const result = await Booking.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a Booking!!');
  }

  return result;
};

//get all Booking
const getAllBookingFromDB = async () => {
  const result = await Booking.find({ isDeleted: false })
    .populate('userId', '_id name email')
    .populate('roomId', ' _id title rent facilities picture status');
  return result;
};

//get single Booking
const getSingleBookingFromDB = async (bookingId: string) => {
  if (!bookingId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'please give Booking id');
  }
  const result = await Booking.findOne({ _id: bookingId, isDeleted: false })
    .populate('userId', '_id name email')
    .populate('roomId', ' _id title rent facilities picture status');

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Booking not found');
  }
  return result;
};

// delete single Booking
const deleteSingleBookingFromDB = async (bookingId: string) => {
  if (!bookingId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide a valid Booking ID',
    );
  }

  const result = await Booking.findByIdAndUpdate(
    bookingId,
    { $set: { isDeleted: true } },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Booking!');
  }

  return result;
};

//update single Booking
const updateSingleUserFromDB = async (
  bookingId: string,
  payload: Partial<TBooking>,
) => {
  if (!bookingId || !payload) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide Booking ID and data',
    );
  }
  const { ...remainingData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  };

  const result = await Booking.findByIdAndUpdate(
    bookingId,
    { $set: modifiedUpdatedData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Booking!');
  }

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
  deleteSingleBookingFromDB,
  updateSingleUserFromDB,
};
