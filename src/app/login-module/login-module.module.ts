import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSiteComponent } from './login-site/login-site.component';
import {FormsModule} from '@angular/forms';
import {NurseGuard} from './guards/nurse.guard';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './token.interceptor';
import {MaterialModule} from '../material/material.module';



@NgModule({
  declarations: [LoginSiteComponent],
  providers: [
    NurseGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class LoginModule { }
