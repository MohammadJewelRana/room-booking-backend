export type TRooms = {
  title: string;
  rent: string;
  facilities: string[];
  picture: string;
  status: 'available' | 'unavailable';
  isDeleted: boolean;
};
