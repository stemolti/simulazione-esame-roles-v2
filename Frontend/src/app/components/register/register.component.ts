import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        class="w-full max-w-sm p-6 bg-white rounded-xl shadow-md space-y-4"
        (ngSubmit)="submit()"
        [formGroup]="form"
      >
        <h1 class="text-2xl font-semibold text-center mb-4">
          Create Account
        </h1>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>First name</mat-label>
          <input matInput formControlName="firstName" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Last name</mat-label>
          <input matInput formControlName="lastName" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" />
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          class="w-full"
          [disabled]="form.invalid"
        >
          Register
        </button>

        <a
          routerLink="/login"
          class="block text-center text-sm text-blue-600 hover:underline"
          >Already have an account?</a
        >
      </form>
    </div>
  `,
})
export class RegisterComponent {
  form;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;
    // Ensure no null values are sent (convert nulls to empty strings)
    const sanitized = {
      firstName: this.form.value.firstName ?? '',
      lastName: this.form.value.lastName ?? '',
      username: this.form.value.username ?? '',
      password: this.form.value.password ?? '',
    };
    this.auth.register(sanitized).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
