import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { NurseMainComponent } from './nurse-main/nurse-main.component';
import {MaterialModule} from '../material/material.module';
import {ToolsModule} from '../tools-module/tools-module.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NursePatientDetailsComponent} from './nurse-patient-details/nurse-patient-details.component';
import { NursePatientRegistrationComponent } from './nurse-patient-registration/nurse-patient-registration.component';
import { NurseMealsOrdersComponent } from './nurse-meals-orders/nurse-meals-orders.component';


@NgModule({
  declarations: [NurseMainComponent, NursePatientDetailsComponent, NursePatientRegistrationComponent, NurseMealsOrdersComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ToolsModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [
    DatePipe
  ],
  entryComponents: [NurseMainComponent, NursePatientDetailsComponent]
})
export class WardNurseModule { }
