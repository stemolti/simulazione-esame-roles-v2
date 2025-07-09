import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Registration } from '../../interfaces/event';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  registeredEvents: Registration[] = [];
  isLoading = true;

  constructor(private eventService: EventService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.eventService.getRegisteredEventsForUser().subscribe({
      next: (events) => {
        this.registeredEvents = events;
        this.isLoading = false;
        console.log('Eventi registrati:', this.registeredEvents);
      },
      error: (err) => {
        console.error('Errore nel recupero eventi:', err);
        this.isLoading = false;
      },
    });
  }

  isFutureEvent(date: string | Date): boolean {
    return new Date(date) > new Date();
  }

  onUnregister(registration: Registration): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title: registration.event.title },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.eventService.unregisterFromEvent(registration.event.id!).subscribe({
        next: () => {
          this.registeredEvents = this.registeredEvents.filter(
            (r) => r.event.id !== registration.event.id
          );
        },
        error: (err) => {
          console.error('Errore durante la disiscrizione:', err);
          alert('Errore durante la disiscrizione. Riprova più tardi.');
        },
      });
    });
  }

  isDayBeforeEvent(date: string | Date): boolean {
    const eventDate = new Date(date);
    const today = new Date();
    eventDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diff =
      (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 1;
  }
}
