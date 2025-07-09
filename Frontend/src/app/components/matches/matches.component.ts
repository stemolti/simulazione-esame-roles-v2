import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Match } from '../../interfaces/match';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-matches',
  template: `
    <div class="p-6 space-y-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Matches</h1>
        <button
          *ngIf="auth.user?.tournamentOrganizer"
          mat-raised-button
          color="primary"
          routerLink="/matches/new"
        >
          New Match
        </button>
      </div>

      <table
        mat-table
        [dataSource]="data"
        class="min-w-full divide-y divide-gray-200"
      >
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let m">
            {{ m.date | date: 'short' }}
          </td>
        </ng-container>

        <ng-container matColumnDef="players">
          <th mat-header-cell *matHeaderCellDef>Players</th>
          <td mat-cell *matCellDef="let m">
            {{ m.participantAId }} vs {{ m.participantBId }}
          </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let m">
            <span
              class="px-3 py-1 rounded-full text-xs"
              [ngClass]="
                m.played
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              "
            >
              {{ m.played ? 'Played' : 'Scheduled' }}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="score">
          <th mat-header-cell *matHeaderCellDef>Score</th>
          <td mat-cell *matCellDef="let m">
            {{ m.played ? m.pointsA + ' - ' + m.pointsB : '—' }}
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let m">
            <button
              *ngIf="auth.user?.tournamentOrganizer"
              mat-button
              color="accent"
              (click)="edit(m)"
            >
              Edit
            </button>
          </td>
        </ng-container>

        <tr
          mat-header-row
          *matHeaderRowDef="displayed"
          class="bg-gray-50"
        ></tr>
        <tr mat-row *matRowDef="let row; columns: displayed"></tr>
      </table>
    </div>
  `,
})
export class MatchesComponent implements OnInit {
  displayed = ['date', 'players', 'status', 'score', 'actions'];
  data: Match[] = [];

  constructor(
    private match: MatchService,
    public auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.match.list().subscribe((m) => (this.data = m));
  }

  edit(m: Match) {
    this.router.navigate(['/matches', m.id]);
  }
}