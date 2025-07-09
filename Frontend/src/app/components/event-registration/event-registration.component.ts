import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-registration',
  standalone: false,
  templateUrl: './event-registration.component.html',
  styleUrl: './event-registration.component.scss',
})
export class EventRegistrationComponent {
  isLoading = false;
  errorMsg = '';

  constructor(
    public dialogRef: MatDialogRef<EventRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string },
    private registrationService: EventService
  ) {}

  register() {
    this.isLoading = true;
    this.registrationService.registerToEvent(this.data.eventId).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close('registered');
        window.location.reload();
      },
      error: (err) => {
        this.errorMsg = "Errore durante l'iscrizione. Riprova.";
        this.isLoading = false;
      },
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
