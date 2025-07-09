import mongoose, { Schema } from 'mongoose';
import { Match } from './match.entity';

const matchSchema = new Schema<Match>(
  {
    date: { type: Date, required: true },
    participantAId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    participantBId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    played: { type: Boolean, default: false },
    pointsA: { type: Number, default: 0 },
    pointsB: { type: Number, default: 0 },
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

export const MatchModel = mongoose.model<Match>('Match', matchSchema);
