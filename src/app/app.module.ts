import {MaterialModule} from './material/material.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LoginModuleModule} from './login-module/login-module.module';
import {KitchenMainComponent} from './kitchen-dietitian-module/kitchen-main/kitchen-main.component';
import {KitchenDietitianModule} from './kitchen-dietitian-module/kitchen-dietitian-module.module';
import {PatientMovementModule} from './patient-movement-module/patient-movement-module.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    LoginModuleModule,
    KitchenDietitianModule,
    PatientMovementModule
  ],
  entryComponents: [],
  exports: [
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
}
