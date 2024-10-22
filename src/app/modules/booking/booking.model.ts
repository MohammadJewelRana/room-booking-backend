import { model, Schema } from 'mongoose';
import { TBooking, TDate } from './booking.interface';

const dateSchema = new Schema<TDate>({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const bookingSchema = new Schema<TBooking>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    roomId: { type: Schema.Types.ObjectId, required: true, ref: 'Room' },
    dates: { type: dateSchema, required: true },
    roomRent: { type: String, required: true,default:'0' },
    roomCount: { type: String, required: true,default:'0' },
    grandTotal: { type: Number, required: true,default:0 },

    status: {
      type: String,
      enum: ['approved', 'pending', 'cancel'],
      default: 'pending',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
