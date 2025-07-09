import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { homeGuard } from './guards/home.guard';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { UserComponent } from './pages/user/user.component';
import { CheckInComponent } from './pages/check-in/check-in.component';
import { StatisticheComponent } from './pages/statistiche/statistiche.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [homeGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [homeGuard] },
  {
    path: 'event-detail/:id',
    component: EventDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'check-in',
    component: CheckInComponent,
    canActivate: [authGuard],
  },
  {
    path: 'event-stats',
    component: StatisticheComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
