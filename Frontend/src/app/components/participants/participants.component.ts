import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from '../../services/participants.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-participants',
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Participants</h1>

      <table
        mat-table
        [dataSource]="data"
        class="min-w-full divide-y divide-gray-200"
      >
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Player</th>
          <td mat-cell *matCellDef="let row">
            {{ row.firstName }} {{ row.lastName }}
          </td>
        </ng-container>

        <ng-container matColumnDef="username">
          <th mat-header-cell *matHeaderCellDef>Username</th>
          <td mat-cell *matCellDef="let row">{{ row.username }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayed"></tr>
        <tr mat-row *matRowDef="let row; columns: displayed"></tr>
      </table>
    </div>
  `,
})
export class ParticipantsComponent implements OnInit {
  displayed = ['name', 'username'];
  data: User[] = [];

  constructor(private participants: ParticipantsService) {}

  ngOnInit() {
    this.participants.list().subscribe((p) => (this.data = p));
  }
}
