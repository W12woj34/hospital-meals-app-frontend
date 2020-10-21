import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {DietitianMainComponent} from './dietitian-main/dietitian-main.component';
import {ToolsModule} from '../tools-module/tools-module.module';
import {MaterialModule} from '../material/material.module';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DietitianPatientDetailsComponent} from './dietitian-patient-details/dietitian-patient-details.component';
import { DietitianAddRestrictionComponent } from './dietitian-add-restriction/dietitian-add-restriction.component';


@NgModule({
  declarations: [DietitianMainComponent, DietitianPatientDetailsComponent, DietitianAddRestrictionComponent],
  imports: [
    CommonModule,
    ToolsModule,
    MaterialModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DatePipe
  ],
  entryComponents: [DietitianMainComponent, DietitianPatientDetailsComponent, DietitianAddRestrictionComponent]
})
export class WardDietitianModule {
}
