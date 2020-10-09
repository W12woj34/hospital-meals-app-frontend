import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DietitianMainComponent} from './dietitian-main/dietitian-main.component';
import {ToolsModule} from '../tools-module/tools-module.module';
import {MaterialModule} from '../material/material.module';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {DietitianPatientDetailsComponent} from './dietitian-patient-details/dietitian-patient-details.component';


@NgModule({
  declarations: [DietitianMainComponent, DietitianPatientDetailsComponent],
  imports: [
    CommonModule,
    ToolsModule,
    MaterialModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  entryComponents: [DietitianMainComponent, DietitianPatientDetailsComponent]
})
export class WardDietitianModule {
}
