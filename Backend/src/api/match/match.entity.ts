import { Types } from 'mongoose';

export interface Match {
  id?: string;
  date: Date;
  participantAId: Types.ObjectId;
  participantBId: Types.ObjectId;
  played: boolean;
  pointsA: number;
  pointsB: number;
}
