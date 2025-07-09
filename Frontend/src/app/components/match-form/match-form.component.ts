import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchService } from '../../services/match.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-match-form',
  template: `
    <div class="p-6 max-w-lg mx-auto">
      <h1 class="text-2xl font-bold mb-4">
        {{ isEdit ? 'Edit Match' : 'New Match' }}
      </h1>

      <form class="space-y-4" [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Date</mat-label>
          <input matInput type="datetime-local" formControlName="date" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Participant A Id</mat-label>
          <input matInput formControlName="participantAId" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Participant B Id</mat-label>
          <input matInput formControlName="participantBId" />
        </mat-form-field>

        <mat-slide-toggle formControlName="played"
          >Already played</mat-slide-toggle
        >

        <div class="flex gap-4" *ngIf="form.value.played">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Points A</mat-label>
            <input matInput type="number" formControlName="pointsA" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Points B</mat-label>
            <input matInput type="number" formControlName="pointsB" />
          </mat-form-field>
        </div>

        <button
          mat-raised-button
          color="primary"
          class="w-full"
          [disabled]="form.invalid"
        >
          {{ isEdit ? 'Save' : 'Create' }}
        </button>
      </form>
    </div>
  `,
})
export class MatchFormComponent implements OnInit {
  isEdit = false;
  id!: string;
  form: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private match: MatchService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      participantAId: ['', Validators.required],
      participantBId: ['', Validators.required],
      played: [false],
      pointsA: [0],
      pointsB: [0],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.isEdit = !!this.id;
    if (this.isEdit) {
      this.match
        .list()
        .subscribe((m) => {
          const current = m.find((x) => x.id === this.id);
          if (current) this.form.patchValue(current as any);
        });
    }
  }

  submit() {
    if (this.form.invalid) return;
    (this.isEdit
      ? this.match.update(this.id, this.form.value)
      : this.match.create(this.form.value)
    ).subscribe(() => this.router.navigateByUrl('/matches'));
  }
}
