import mongoose, { Schema } from 'mongoose';
import { User } from './user.entity';

const userSchema = new Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    picture: { type: String },
    username: { type: String, required: true },
    isConfirmed: { type: Boolean, default: true },
    registeredForTournament: { type: Boolean, default: false },
    tournamentOrganizer: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export const UserModel = mongoose.model<User>('User', userSchema);
