import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NurseMainComponent } from './nurse-main/nurse-main.component';
import {MaterialModule} from '../material/material.module';
import {ToolsModule} from '../tools-module/tools-module.module';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NursePatientDetailsComponent} from './nurse-patient-details/nurse-patient-details.component';
import { NursePatientRegistrationComponent } from './nurse-patient-registration/nurse-patient-registration.component';
import { NurseMealsOrdersComponent } from './nurse-meals-orders/nurse-meals-orders.component';
import {MatCheckboxModule} from '@angular/material/checkbox';




@NgModule({
  declarations: [NurseMainComponent, NursePatientDetailsComponent, NursePatientRegistrationComponent, NurseMealsOrdersComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ToolsModule,
        MatSortModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        MatCheckboxModule
    ],
  entryComponents: [NurseMainComponent, NursePatientDetailsComponent]
})
export class WardNurseModule { }
