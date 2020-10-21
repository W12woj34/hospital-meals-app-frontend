import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';
import {PatientMovementWorkerPasswordChangeComponent} from '../patient-movement-worker-password-change/patient-movement-worker-password-change.component';
import {EmployeeService} from '../../service/base/employee.service';
import {EmployeeData} from '../../dataBaseObjects/employee-data';
import {LoginService} from '../../service/base/login.service';
import {WardNurseService} from '../../service/base/ward-nurse.service';
import {MainKitchenDietitianService} from '../../service/base/main-kitchen-dietitan.service';
import {DietitianService} from '../../service/base/dietitian.service';
import {PatientMovementService} from '../../service/base/patient-movement.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-movement-worker-details',
  templateUrl: './patient-movement-worker-details.component.html',
  styleUrls: ['./patient-movement-worker-details.component.css']
})

export class PatientMovementWorkerDetailsComponent implements OnInit {

  worker: EmployeeData;

  constructor(public dialogRef: MatDialogRef<PatientMovementWorkerDetailsComponent>,
              public dialog: MatDialog,
              private employeeService: EmployeeService,
              private loginService: LoginService,
              private wardNurseService: WardNurseService,
              private kitchenDietitianService: MainKitchenDietitianService,
              private wardDietitianService: DietitianService,
              private patientMovementService: PatientMovementService,
              private snackBar: MatSnackBar,
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
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }
      this.employeeService.get(this.data.id).subscribe(emp => {
        this.employeeService.delete(String(this.data.id)).subscribe(() => {
          this.loginService.delete(String(emp.loginId)).subscribe(() => {
            this.displayInfo();
          });
        });
      });
    });


  }


  onPassChange(): void {
    const dialogRef = this.dialog.open(PatientMovementWorkerPasswordChangeComponent, {
      minWidth: 'fit-content',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }
      console.log('The dialog was closed');
      this.dialogRef.close(false);
    });

  }

  onConfirm(): void {
    console.log('The dialog was closed');
    this.dialogRef.close(false);
  }

  displayInfo(): void {
    this.snackBar.open('Usunięto Pracownika!', 'OK', {
      duration: 4000,
    });
    this.dialogRef.close(true);
  }
}

