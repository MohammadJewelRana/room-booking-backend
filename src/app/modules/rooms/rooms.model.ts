import { model, Schema } from 'mongoose';
import { TRooms } from './rooms.interface';

const roomSchema = new Schema<TRooms>(
  {
    roomTitle: { type: String, required: true },  
    rent: { type: String, required: true },
    facilities: { type: [String], required: true },
    images: { type: [String], required: true },  
    bedCount: { type: Number, required: true },  
    memberCount: { type: Number, required: true },  
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,  
  },
);

export const Room = model<TRooms>('Room', roomSchema);
