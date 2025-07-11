import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ParticipantsComponent } from './pages/participants/participants.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { MatchManagementComponent } from './pages/match-management/match-management.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { authGuard } from './guards/auth.guard';
import { ParticipantGuard } from './guards/participant.guard';
import { OrganizerGuard } from './guards/organizer.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'participants', component: ParticipantsComponent, canActivate: [ParticipantGuard] },
  { path: 'matches', component: MatchesComponent, canActivate: [ParticipantGuard] },
  { path: 'match-management', component: MatchManagementComponent, canActivate: [OrganizerGuard] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [ParticipantGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
