import mongoose, { Schema, Types } from 'mongoose';
import { Registration } from './registration.entity';

const registrationSchema = new Schema<Registration>(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    event: { type: Types.ObjectId, ref: 'Event', required: true },
    checkinEffettuato: { type: Boolean, default: false },
    oraCheckin: { type: Date },
  },
  {
    timestamps: true,
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

export const RegistrationModel = mongoose.model<Registration>(
  'Registration',
  registrationSchema,
);
