import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is created successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingFromDB();
  // console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Booking retrieved successfully',
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  const result = await BookingServices.getSingleBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Booking retrieved successfully',
    data: result,
  });
});
const getMyBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  const result = await BookingServices.getMyBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Booking retrieved successfully',
    data: result,
  });
});

const deleteSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteSingleBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Booking deleted successfully',
    data: result,
  });
});

const updateSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await BookingServices.updateSingleUserFromDB(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Booking updated successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  deleteSingleBooking,
  updateSingleBooking,
  getMyBooking,
};
