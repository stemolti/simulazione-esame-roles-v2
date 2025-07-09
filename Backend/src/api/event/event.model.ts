import mongoose, { Schema } from 'mongoose';
import { Event } from './event.entity';

const eventSchema = new Schema<Event>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
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

export const EventModel = mongoose.model<Event>('Event', eventSchema);
