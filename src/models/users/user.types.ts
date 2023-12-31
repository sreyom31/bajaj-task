import { Document, Model } from 'mongoose';

export interface IUser {
  is_success: boolean;
  email: string;
  user_id: string;
  roll_number: string;
  numbers: [string];
  alphabets: [string];
  highest_alphabet: [string];
  dateOfEntry: Date;
  lastUpdated: Date;
}

export interface IUserDocument extends IUser, Document {
  setLastUpdated: (this: IUserDocument) => Promise<void>;
  isPasswordMatch(this: IUserDocument, password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  isEmailTaken: (
    this: IUserModel,
    name: string,
    excludeId?: string
  ) => Promise<boolean>;
  paginate: (
    filter: any,
    options: any
  ) => {
    results: any;
    page: number;
    limit: number;
    totalPages: number;
    totalResults: any;
  };
}
