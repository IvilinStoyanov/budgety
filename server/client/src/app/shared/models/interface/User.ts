export interface IUser {
  _id: string;
  googleId: string;
  name: object;
  picture: string;
  email: string;
  locale: string;
  savings: number;
  inc: number;
  exp: number;
  incPercentage: number;
  expPercentage: number;
  isCategoriesSet: boolean;
  role: string;
}
