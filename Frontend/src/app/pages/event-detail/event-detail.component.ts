import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { NotificationService } from '../../services/notification.service';
import { EventRegistrationComponent } from '../../components/event-registration/event-registration.component';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-event-detail',
  standalone: false,
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent {
  eventId!: string;
  event: any;
  isLoading = false;
  userRole: string | null = null;
  isCheckingRegistration = true;
  isRegistered = false;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private dialog: MatDialog,
    private authService: AuthService,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id')!;

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.userRole = user?.role || null;
        if (user) {
          this.checkIfRegistered();
        } else {
          this.isCheckingRegistration = false;
        }
      });

    this.loadEvent();
  }

  loadEvent() {
    this.isLoading = true;
    this.eventService.getEventById(this.eventId).subscribe({
      next: (ev) => {
        this.event = ev;
        this.isLoading = false;
      },
      error: () => {
        this.notify.errorMessage('Errore nel caricamento evento');
        this.isLoading = false;
      },
    });
  }

  get showRegistrationButton(): boolean {
    if (!this.event?.date) return false;

    const eventDate = new Date(this.event.date);
    const now = new Date();
    eventDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= 1;
  }

  checkIfRegistered() {
    this.isCheckingRegistration = true;
    this.eventService.isUserRegistered(this.eventId).subscribe({
      next: (res) => {
        this.isRegistered = res.registered;
        this.isCheckingRegistration = false;
      },
      error: () => {
        this.isRegistered = false;
        this.isCheckingRegistration = false;
      },
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { event: this.event },
    });

    dialogRef.afterClosed().subscribe((updated) => {
      if (updated) {
        this.loadEvent();
        this.notify.successMessage('Evento aggiornato con successo');
      }
    });
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: 'Sei sicuro di voler eliminare questo evento?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEvent();
      }
    });
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.eventId).subscribe({
      next: () => {
        this.notify.successMessage('Evento eliminato con successo');
        this.router.navigate(['/']); // Redirect alla home
      },
      error: () =>
        this.notify.errorMessage("Errore durante l'eliminazione evento"),
    });
  }

  openRegistrationDialog() {
    const dialogRef = this.dialog.open(EventRegistrationComponent, {
      width: '300px',
      data: { eventId: this.eventId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'registered') {
        this.notify.successMessage('Iscrizione avvenuta con successo');
      }
    });
  }
}
