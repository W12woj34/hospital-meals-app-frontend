import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../dataBaseObjects/user';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login-site',
  templateUrl: './login-site.component.html',
  styleUrls: ['./login-site.component.css']
})
export class LoginSiteComponent implements OnInit {

  user: User = {username: '', password: ''};

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.authService.login(this.user).subscribe(
      (_ => {
        if (this.authService.getLoggedUser() === 'ROLE_MOVEMENT') {
          this.router.navigateByUrl('patientMovement');
        } else if (this.authService.getLoggedUser() === 'ROLE_NURSE') {
          this.router.navigateByUrl('wardNurse');
        } else if (this.authService.getLoggedUser() === 'ROLE_KITCHEN') {
          this.router.navigateByUrl('kitchenDietitian');
        } else if (this.authService.getLoggedUser() === 'ROLE_DIETITIAN') {
          this.router.navigateByUrl('wardDietitian');

        }
      }));

  }
}
