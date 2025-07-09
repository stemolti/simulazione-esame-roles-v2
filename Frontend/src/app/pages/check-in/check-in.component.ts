import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { Registration, AppEvent } from '../../interfaces/event';
import { User } from '../../interfaces/user';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-check-in',
  standalone: false,
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.scss',
})
export class CheckInComponent {
  users: User[] = [];
  registrations: Registration[] = [];
  eventsForUser: AppEvent[] = [];

  selectedUserId = '';
  selectedEventId = '';

  message = '';
  isLoading = false;

  constructor(
    private eventService: EventService,
    private userService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users.filter((user) => user.role === 'dipendente');
      },
      error: () => {
        this.message = 'Errore nel caricamento utenti.';
      },
    });
  }

  onUserSelected(userId: string) {
    this.selectedUserId = userId;
    this.selectedEventId = '';
    this.eventsForUser = [];
    this.message = '';
    if (!userId) return;

    this.eventService.getUserRegistrations(userId).subscribe({
      next: (regs) => {
        this.registrations = regs;
        this.eventsForUser = regs
          .filter((r) => r.checkinEffettuato === false)
          .map((r) => r.event);
        if (this.eventsForUser.length === 0) {
          this.message = 'Utente non registrato a nessun evento.';
        }
      },
      error: () => {
        this.message = 'Errore nel recupero degli eventi per l’utente.';
      },
    });
  }

  performCheckin() {
    if (!this.selectedUserId || !this.selectedEventId) {
      this.message = 'Seleziona sia un utente che un evento.';
      return;
    }

    this.isLoading = true;
    this.message = '';

    this.eventService
      .performCheckin(this.selectedUserId, this.selectedEventId)
      .subscribe({
        next: () => {
          this.notificationService.successMessage(
            'Check-in effettuato con successo!'
          );
          this.isLoading = false;
        },
        error: (err) => {
          this.message = err.error?.message || 'Errore durante il check-in.';
          this.isLoading = false;
        },
      });
  }
}
