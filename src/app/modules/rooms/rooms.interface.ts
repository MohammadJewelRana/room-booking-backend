export type TRooms = {
  roomTitle: string;
  rent: string;
  facilities: string[];
  images: string[];
  bedCount:number;
  memberCount:number;
  status: 'available' | 'unavailable';
  isDeleted: boolean;
};
