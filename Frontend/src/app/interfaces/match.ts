export interface Match {
  id?: string;
  date: string;          // ISO string
  participantAId: string;
  participantBId: string;
  played: boolean;
  pointsA: number;
  pointsB: number;
}
