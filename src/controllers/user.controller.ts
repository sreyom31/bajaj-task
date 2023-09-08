import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/CatchAsync';
import { userService } from '../services';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const calculateAlphabet = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.calculateAlphabet(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getStatus = catchAsync(async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send({
    operation_code: 1,
  });
});

export default { getStatus, createUser, calculateAlphabet };
