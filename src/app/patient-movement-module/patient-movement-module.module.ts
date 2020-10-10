import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovementMainComponent} from './movement-main/movement-main.component';
import {ToolsModule} from '../tools-module/tools-module.module';
import {MaterialModule} from '../material/material.module';
import {PatientMovementLogsComponent} from './patient-movement-logs/patient-movement-logs.component';
import {PatientMovementWorkersComponent} from './patient-movement-workers/patient-movement-workers.component';
import {PatientMovementWorkerDetailsComponent} from './patient-movement-worker-details/patient-movement-worker-details.component';
import {PatientMovementAddWorkerComponent} from './patient-movement-add-worker/patient-movement-add-worker.component';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [MovementMainComponent,
    PatientMovementLogsComponent,
    PatientMovementWorkersComponent,
    PatientMovementWorkerDetailsComponent,
    PatientMovementAddWorkerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ToolsModule,
    FormsModule,
    MatSelectModule
  ],
  exports: [MovementMainComponent]
})
export class PatientMovementModule {
}
