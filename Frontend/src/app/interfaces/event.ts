export interface AppEvent {
  id?: string;
  title: string;
  date: Date;
  location?: string;
  description?: string;
}

export interface Registration {
  id: string;
  user: string;
  event: AppEvent;
  checkinEffettuato: boolean;
  createdAt: string;
  updatedAt: string;
}
