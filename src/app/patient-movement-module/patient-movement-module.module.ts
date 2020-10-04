import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementMainComponent } from './movement-main/movement-main.component';
import {ToolsModule} from '../tools-module/tools-module.module';
import {MaterialModule} from '../material/material.module';



@NgModule({
  declarations: [MovementMainComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ToolsModule
  ],
  exports: [MovementMainComponent]
})
export class PatientMovementModule { }
