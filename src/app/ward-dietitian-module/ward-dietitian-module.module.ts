import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietitianMainComponent } from './dietitian-main/dietitian-main.component';
import {ToolsModule} from '../tools-module/tools-module.module';
import {MaterialModule} from '../material/material.module';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [DietitianMainComponent],
  imports: [
    CommonModule,
    ToolsModule,
    MaterialModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class WardDietitianModule { }
