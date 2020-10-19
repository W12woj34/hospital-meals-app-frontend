import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PasswordChangeForce} from '../../dataBaseObjects/password-change-force';
import {LoginService} from '../../service/base/login.service';

@Component({
  selector: 'app-patient-movement-worker-password-change',
  templateUrl: './patient-movement-worker-password-change.component.html',
  styleUrls: ['./patient-movement-worker-password-change.component.css']
})
export class PatientMovementWorkerPasswordChangeComponent implements OnInit {

  dialogResult;
  pass: PasswordChangeForce = {newPassword: '', newPasswordConfirm: ''};

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PatientMovementWorkerPasswordChangeComponent>,
    public dialog: MatDialog,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {


  }


  onSubmit(): void {

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
      this.loginService.changePasswordForce(this.pass.newPassword, this.data.id).subscribe(isChanged => {
          if (isChanged === true) {
            this.snackBar.open('Hasło zmieniono!', 'OK', {
              duration: 4000,
            });
            console.log('The dialog was closed');
            this.dialogRef.close(true);
          }
        }
      );
    });
  }
}
