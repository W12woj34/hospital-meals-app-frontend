import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {NgForm} from '@angular/forms';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface PatientRegister {
  pesel: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

@Component({
  selector: 'app-nurse-patient-registration',
  templateUrl: './nurse-patient-registration.component.html',
  styleUrls: ['./nurse-patient-registration.component.css']
})


export class NursePatientRegistrationComponent implements OnInit {

  patient: PatientRegister = {pesel: '', firstName: '', lastName: '', birthDate: ''};
  color: ThemePalette = 'primary';
  firstTime = false;
  dialogResult;

  constructor(public dialogRef: MatDialogRef<NursePatientRegistrationComponent>,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onSubmit(registerForm: NgForm): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: 'fit-content',
      data: {result: this.dialogResult}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      console.log(this.dialogResult);
      if (this.dialogResult === false) {
        return;
      }

    /*  this.api.login('/login', this.patient).subscribe(
        (r => {

          }
        ));

     */
// tu trzeba będzie zapisać wszystko
      console.log('The dialog was closed');
      this.dialogRef.close(true);
    });


  }
}
