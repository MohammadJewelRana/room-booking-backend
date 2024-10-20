import { model, Schema } from "mongoose";
import { TRooms } from "./rooms.interface";

 


const roomSchema = new Schema<TRooms>(
  {
    title: { type: String, required: true },
    rent: { type: String, required: true },
    facilities: { type: [String], required: true },  
    picture: { type: String, required: true },
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

 

export const Room = model<TRooms>('Room', roomSchema);
