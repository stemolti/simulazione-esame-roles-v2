import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { EventService } from '../../services/event.service';
import { AppEvent } from '../../interfaces/event';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CreateDialogComponent } from '../../components/create-dialog/create-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  private destroy$ = new Subject<void>();
  public events: AppEvent[] = [];
  public filteredEvents: AppEvent[] = [];
  public isLoading = false;
  public searchTerm = '';

  isOrganizer$: Observable<boolean>;

  constructor(
    private eventService: EventService,
    private notify: NotificationService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.isOrganizer$ = this.authService.currentUser$.pipe(
      map((user) => user?.role?.includes('organizzatore') ?? false)
    );
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  openCreateEventDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'created') {
        this.notify.successMessage('Evento creato con successo!');
        this.fetchEvents();
      }
    });
  }

  fetchEvents() {
    this.isLoading = true;
    this.eventService
      .getAllEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          const today = new Date();
          this.events = res.filter(
            (event) => new Date(event.date) >= this.clearTime(today)
          );
          this.filteredEvents = [...this.events];
          this.isLoading = false;
        },
        error: () => {
          this.notify.errorMessage('Errore nel recupero degli eventi');
          this.isLoading = false;
        },
      });
  }

  clearTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  filterEvents() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter((e) =>
      e.title.toLowerCase().includes(term)
    );
  }

  openEventDetails(event: AppEvent) {
    console.log('Dettagli evento:', event);
    this.router.navigate(['/event-detail', event.id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
