import { Types } from 'mongoose';
import { User } from '../user/user.entity';

export interface Registration {
  id?: string;
  user: User | string;
  event: Event | string;
  checkinEffettuato: boolean;
  oraCheckin?: Date;
}
