import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class KitchenGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn() === true && this.authService.getLoggedUser() === 'ROLE_KITCHEN') {
      return true;
    }
    this.authService.logout();
    return false;
  }
}
