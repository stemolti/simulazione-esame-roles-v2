import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { MatchesComponent } from './components/matches/matches.component';
import { MatchFormComponent } from './components/match-form/match-form.component';
import { AuthGuard } from './guards/auth.guard';
import { ParticipantGuard } from './guards/participant.guard';
import { OrganizerGuard } from './guards/organizer.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'participants',
    component: ParticipantsComponent,
    canActivate: [AuthGuard, ParticipantGuard],
  },
  {
    path: 'matches',
    component: MatchesComponent,
    canActivate: [AuthGuard, ParticipantGuard],
  },
  {
    path: 'matches/new',
    component: MatchFormComponent,
    canActivate: [AuthGuard, OrganizerGuard],
  },
  {
    path: 'matches/:id',
    component: MatchFormComponent,
    canActivate: [AuthGuard, OrganizerGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
