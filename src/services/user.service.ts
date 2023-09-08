import httpStatus from 'http-status';
import { User } from '../shared/customTypes';
import UserModel from '../models/users/user.model';
import ApiError from '../utils/ApiError';

const createUser = async (userBody: User) => {
  if (await UserModel.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return UserModel.create(userBody);
};

const calculateAlphabet = async (body: any) => {
  const result = body.data.reduce(
    (acc, value) => {
      if (value.toLowerCase() !== value.toUpperCase()) {
        // If the value is a number, add it to the numbers array
        acc.alphabets.push(value);
      } else {
        // If the value is not a number, add it to the alphabets array
        acc.numbers.push(value);
      }
      return acc;
    },
    { numbers: [], alphabets: [] }
  );
  const findHigestAlphabet = (arr) => {
    if (arr.length < 1) return [];
    let highestValue;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].charCodeAt(0) > arr[i + 1].charCodeAt(0)) {
        highestValue = arr[i];
      } else {
        highestValue = arr[i+1];
      }
    }
    return [highestValue];
  };
  let highest = findHigestAlphabet(result.alphabets);
  const user = await UserModel.findOne();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  user.numbers = result.numbers;
  user.alphabets = result.alphabets;
  user.highest_alphabet = highest;
  await user.save();
  return user;
};

export default {
  createUser,
  calculateAlphabet,
};
