export interface IUser {
  _id: string;
  googleId: string;
  name: {
    givenName?: string;
    familyName?: string;
    [key: string]: unknown;
  };
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
