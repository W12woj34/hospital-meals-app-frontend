import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../service/api.service';
import {User} from '../../dataBaseObjects/User';

@Component({
  selector: 'app-login-site',
  templateUrl: './login-site.component.html',
  styleUrls: ['./login-site.component.css']
})
export class LoginSiteComponent implements OnInit {

  user: User = {username: '', password: ''};

  constructor(private router: Router, private api: ApiService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form): void {
    // console.log(this.user, form.form._value)
    // this.user$.loginUser(this.user)

    this.api.login('/login', this.user).subscribe(
      (r => {
        if (this.api.getRole() === 'ROLE_MOVEMENT') {
          this.router.navigateByUrl('patientMovement');
        } else if (this.api.getRole() === 'ROLE_NURSE') {
          this.router.navigateByUrl('wardNurse');
        } else if (this.api.getRole() === 'ROLE_KITCHEN') {
          this.router.navigateByUrl('kitchenDietitian');
        } else if (this.api.getRole() === 'ROLE_DIETITIAN') {
          this.router.navigateByUrl('wardDietitian');

        }
      }));
  }
}
