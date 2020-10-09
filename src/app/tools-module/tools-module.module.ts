import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopBarComponent} from './top-bar/top-bar.component';
import {MaterialModule} from '../material/material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [TopBarComponent, ConfirmDialogComponent, SpinnerComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [TopBarComponent, ConfirmDialogComponent, SpinnerComponent]
})
export class ToolsModule {
}
