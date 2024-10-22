import { Types } from 'mongoose';

export type TDate = {
  startDate: Date;
  endDate: Date;
};

export type TBooking = {
  userId: Types.ObjectId;
  roomId: Types.ObjectId;
  dates: TDate;
  roomRent:string;
  roomCount:string;
  grandTotal:number;



  status: 'running' | 'pending' | 'complete';
  isDeleted: boolean;
};
 