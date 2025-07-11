import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ParticipantGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    // TODO: Implement participant role check
    return true;
  }
} 