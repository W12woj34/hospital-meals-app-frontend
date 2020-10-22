import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopBarComponent} from './top-bar/top-bar.component';
import {MaterialModule} from '../material/material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChangePersonDataComponent } from './change-person-data/change-person-data.component';


@NgModule({
  declarations: [TopBarComponent, ConfirmDialogComponent, SpinnerComponent, PasswordChangeComponent, ChangePersonDataComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
  exports: [TopBarComponent, ConfirmDialogComponent, SpinnerComponent]
})
export class ToolsModule {
}
