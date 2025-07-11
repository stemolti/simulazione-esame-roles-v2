export interface Participant {
  id?: string;
  firstName: string;
  lastName: string;
  picture?: string;
  username: string;
  isConfirmed: boolean;
  registeredForTournament?: boolean;
  tournamentOrganizer?: boolean;
} 