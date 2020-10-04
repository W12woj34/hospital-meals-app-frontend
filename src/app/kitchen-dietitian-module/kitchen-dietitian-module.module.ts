import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KitchenMainComponent} from './kitchen-main/kitchen-main.component';
import {MaterialModule} from '../material/material.module';
import {ToolsModule} from '../tools-module/tools-module.module';



@NgModule({
  declarations: [KitchenMainComponent],
  imports: [
    ToolsModule,
    CommonModule,
    MaterialModule
  ],
  exports: [KitchenMainComponent]
})
export class KitchenDietitianModule {
}
