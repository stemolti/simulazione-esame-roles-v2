import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        class="w-full max-w-sm p-6 bg-white rounded-xl shadow-md space-y-4"
        (ngSubmit)="submit()"
        [formGroup]="form"
      >
        <h1 class="text-2xl font-semibold text-center mb-4">Login</h1>

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
          Sign in
        </button>

        <a
          routerLink="/register"
          class="block text-center text-sm text-blue-600 hover:underline"
          >Create account</a
        >
      </form>
    </div>
  `,
})
export class LoginComponent {
  form;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;
    const { username, password } = this.form.value;
    this.auth.login(username!, password!).subscribe(() => {
      this.router.navigateByUrl('/dashboard');
    });
  }
}
