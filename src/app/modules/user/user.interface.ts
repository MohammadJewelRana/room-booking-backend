export type TUser = {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  role: 'admin' | 'user';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
