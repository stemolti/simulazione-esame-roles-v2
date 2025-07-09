import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from 'express';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { NotificationService } from '../../services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-dialog',
  standalone: false,
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.scss',
})
export class CreateDialogComponent {
  form: FormGroup;
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateDialogComponent>,
    private eventService: EventService,
    private notify: NotificationService
  ) {
    this.minDate = this.tomorrow();

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
    });
  }

  tomorrow(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.invalid) {
      this.notify.errorMessage('Compila tutti i campi obbligatori');
      return;
    }

    const newEvent = {
      ...this.form.value,
      date: this.form.value.date.toISOString(),
    };

    this.eventService.createEvent(newEvent).subscribe({
      next: () => {
        this.dialogRef.close('created');
      },
      error: () => {
        this.notify.errorMessage("Errore nella creazione dell'evento");
      },
    });
  }
}
