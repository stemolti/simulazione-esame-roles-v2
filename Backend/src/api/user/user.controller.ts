import { NextFunction, Response, Request } from 'express';
import userService from './user.service';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TypedRequest } from '../../utils/typed-request';
import { UserModel } from './user.model';
import { User } from './user.entity';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, picture, username, password } = req.body;
    const createdUser = await userService.add(
      {
        firstName,
        lastName,
        picture,
        username,
        isConfirmed: true,
      },
      { username, password },
    );
    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    if (!token) {
      res.status(401).send('Invalid credentials');
      return;
    }
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const me = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction,
) => {
  res.json(req.user!);
};

export const confirmEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.body;
  if (!token) {
    res.status(400).send('Missing token');
    return;
  }
  try {
    const key = process.env.SECRET_MAIL_KEY;
    const { userId } = jwt.verify(token, key!) as JwtPayload;
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    user.isConfirmed = true;
    await user.save();
    res.status(200).send('Email confirmed successfully');
  } catch {
    res.status(400).send('Invalid or expired token');
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user! as User;
    const { newPassword, confirmPassword } = req.body;
    const updatedUser = await userService.updatePassword(
      user,
      newPassword,
      confirmPassword,
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response) => {
  const userList = await userService.list();
  res.json(userList);
};
