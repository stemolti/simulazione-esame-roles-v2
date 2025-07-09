import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-edit-dialog',
  standalone: false,
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      title: [data.event.title, Validators.required],
      description: [data.event.description],
      date: [new Date(data.event.date), Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const updatedEvent = this.form.value;
    this.eventService.updateEvent(this.data.event.id, updatedEvent).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => alert("Errore durante l'aggiornamento"),
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
