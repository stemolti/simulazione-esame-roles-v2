import { UserExistsError } from '../../errors/user-exists';
import { UserIdentityModel } from '../../utils/auth/local/user-identity.model';
import { User } from './user.entity';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  PasswordMismatchError,
  SamePasswordError,
} from '../../errors/password';

export class UserService {
  async add(
    user: User,
    credentials: { username: string; password: string },
  ): Promise<User> {
    const existingIdentity = await UserIdentityModel.findOne({
      'credentials.username': credentials.username,
    });
    if (existingIdentity) {
      throw new UserExistsError();
    }
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    const newUser = await UserModel.create(user);
    await UserIdentityModel.create({
      provider: 'local',
      user: newUser.id,
      credentials: {
        username: credentials.username,
        hashedPassword,
      },
    });
    return newUser;
  }

  async login(username: string, password: string): Promise<string | null> {
    const identity = await UserIdentityModel.findOne({
      'credentials.username': username,
    }).populate('user');
    if (!identity) return null;
    const valid = await bcrypt.compare(
      password,
      identity.credentials.hashedPassword,
    );
    if (!valid) return null;
    const user = identity.user as User;
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        tournamentOrganizer: user.tournamentOrganizer,
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' },
    );
    return token;
  }

  async list(): Promise<User[]> {
    return UserModel.find();
  }

  async updatePassword(
    user: User,
    newPassword: string,
    confirmPassword: string,
  ) {
    if (newPassword !== confirmPassword) {
      throw new PasswordMismatchError();
    }
    const identity = await UserIdentityModel.findOne({ user: user.id! });
    if (
      await bcrypt.compare(newPassword, identity!.credentials.hashedPassword)
    ) {
      throw new SamePasswordError();
    }
    identity!.credentials.hashedPassword = await bcrypt.hash(newPassword, 10);
    await identity!.save();
    return this._getById(user.id!);
  }

  private async _getById(userId: string) {
    return UserModel.findById(userId);
  }
}

export default new UserService();
