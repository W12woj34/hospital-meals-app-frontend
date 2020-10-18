import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';
import {PatientMovementWorkerPasswordChangeComponent} from '../patient-movement-worker-password-change/patient-movement-worker-password-change.component';
import {EmployeeService} from '../../service/base/employee.service';
import {EmployeeData} from '../../dataBaseObjects/employee-data';

export interface WorkerData {
  idWorker: number;
  pesel: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  role: string;
  ward: string;
}


@Component({
  selector: 'app-patient-movement-worker-details',
  templateUrl: './patient-movement-worker-details.component.html',
  styleUrls: ['./patient-movement-worker-details.component.css']
})

export class PatientMovementWorkerDetailsComponent implements OnInit {

  dialogResult;
  worker: EmployeeData;

  constructor(public dialogRef: MatDialogRef<PatientMovementWorkerDetailsComponent>,
              public dialog: MatDialog,
              private employeeService: EmployeeService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

    this.employeeService.getEmployeeData('data/' + this.data.id)
      .subscribe(employee => {
        this.worker = employee;

      });
  }

  isWardNurse(): boolean {
    return this.worker.role === 'Pielęgniarka Oddziałowa';
  }

  onFire(): void {
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
      console.log('The dialog was closed');
      this.dialogRef.close(true);
    });

    // tu trzeba będzie zapisać wszystko

  }


  onPassChange(): void {
    const dialogRef = this.dialog.open(PatientMovementWorkerPasswordChangeComponent, {
      minWidth: 'fit-content',
      data: {result: this.dialogResult}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      console.log(this.dialogResult);
      if (this.dialogResult === false) {
        return;
      }
      console.log('The dialog was closed');
      this.dialogRef.close(true);
    });

    // tu trzeba będzie zapisać wszystko

  }

  onConfirm(): void {
    console.log('The dialog was closed');
    this.dialogRef.close(true);

    // tu trzeba będzie zapisać wszystko

  }
}

/** Builds and returns a new User. */
function createNewUser(): WorkerData {

  return {
    idWorker: 11,
    pesel: '98100403971',
    firstName: 'Wojciech',
    lastName: 'Szewczuk',
    role: 'Pielęgniarka Oddziałowa',
    birthDate: '04.10.1998',
    ward: 'Onkologia'
  };
}

