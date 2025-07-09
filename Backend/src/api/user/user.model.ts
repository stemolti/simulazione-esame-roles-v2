import mongoose, { Schema } from 'mongoose';
import { User, UserRole } from './user.entity';

const userSchema = new Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    picture: { type: String },
    isConfirmed: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['dipendente', 'organizzatore'] as UserRole[],
      required: true,
      default: 'dipendente',
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.isConfirmed;
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
