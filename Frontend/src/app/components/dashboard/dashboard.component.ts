import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="p-6 space-y-4">
      <h1 class="text-3xl font-bold">Welcome, {{ auth.user?.firstName }}</h1>

      <div class="flex gap-4 flex-wrap">
        <button
          mat-raised-button
          color="primary"
          (click)="subscribe()"
          [disabled]="auth.user?.registeredForTournament"
        >
          Subscribe to Tournament
        </button>

        <button
          mat-raised-button
          color="accent"
          (click)="setOrganizer()"
          [disabled]="auth.user?.tournamentOrganizer"
        >
          I am an Organizer
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          routerLink="/participants"
          mat-card
          class="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 class="text-xl font-semibold mb-2">Participants List</h2>
          <p>View all registered players.</p>
        </a>

        <a
          routerLink="/matches"
          mat-card
          class="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 class="text-xl font-semibold mb-2">Matches</h2>
          <p>Upcoming & played matches.</p>
        </a>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  constructor(public auth: AuthService, private tournament: TournamentService) {}

  subscribe() {
    this.tournament.subscribe().subscribe((u) => (this.auth.userChanges() as any).next(u));
  }

  setOrganizer() {
    this.tournament
      .setOrganizer()
      .subscribe((u) => (this.auth.userChanges() as any).next(u));
  }
}
