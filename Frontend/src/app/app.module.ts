import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './utils/auth.interceptor';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { LOCALE_ID } from '@angular/core';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ParticipantsComponent } from './pages/participants/participants.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { MatchManagementComponent } from './pages/match-management/match-management.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';

registerLocaleData(localeIt);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoaderComponent,
    SidebarComponent,
    ConfirmDialogComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatProgressBarModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'it-IT' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
