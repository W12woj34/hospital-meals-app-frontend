import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSiteComponent } from './login-site/login-site.component';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [LoginSiteComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class LoginModuleModule { }
