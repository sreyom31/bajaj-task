import { Schema } from 'mongoose';
import validator from 'validator';
import { setLastUpdated } from './user.methods';
import { isEmailTaken } from './user.statics';
import { toJSON, paginate } from '../plugins';

const UserSchema = new Schema({
  is_success: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  user_id: {
    type: String,
    required: [true, 'user_id is required'],
    trim: true,
  },
  roll_number: {
    type: String,
    trim: true,
  },
  numbers: {
    type: [String],
  },
  alphabets: {
    type: [String],
  },
  highest_alphabet: {
    type: [String],
  },
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});

// add plugin that converts mongoose to json
UserSchema.plugin(toJSON);
UserSchema.plugin(paginate);
UserSchema.methods.setLastUpdated = setLastUpdated;
UserSchema.statics.isEmailTaken = isEmailTaken;

export default UserSchema;
