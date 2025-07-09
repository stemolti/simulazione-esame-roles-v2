export type UserRole = 'dipendente' | 'organizzatore';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  picture?: string;
  username: string;
  isConfirmed: boolean;
  role: UserRole;
}
