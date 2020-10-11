import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../../service/api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-patient-movement-worker-password-change',
  templateUrl: './patient-movement-worker-password-change.component.html',
  styleUrls: ['./patient-movement-worker-password-change.component.css']
})
export class PatientMovementWorkerPasswordChangeComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  dialogResult;

  constructor(private api: ApiService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PatientMovementWorkerPasswordChangeComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {

    this.formGroup.addControl('newPassword', new FormControl());
    this.formGroup.addControl('newPasswordConfirm', new FormControl());


  }

  changePassword(): void {

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


    // const snack = this.snackBar.open('Snack bar open before dialog');
    /*
    if (this.formGroup.get('newPassword').value === this.formGroup.get('newPasswordConfirm').value) {
      this.api.put('/logins/change-password/' + this.api.id + '?oldPassword=' + this.formGroup.get('oldPassword').value + '&newPassword='
        + this.formGroup.get('newPassword').value, {});

      this.snackBar.open('Password chenge request send', 'Close', {
        duration: 3000,
        panelClass: ['blue-snackbar']
      });
    } else if (this.formGroup.get('newPassword').value !== this.formGroup.get('newPasswordConfirm').value) {
      this.snackBar.open('Passwords are not the same', 'Close', {
        duration: 3000,
        panelClass: ['blue-snackbar']
      });
    } else {
      this.api.put('/logins/change-password/' + this.api.id + '?oldPassword=' + this.formGroup.get('oldPassword').value +
      '&newPassword=' + this.formGroup.get('newPassword').value, {});

      this.snackBar.open('Password chenge request send', 'Close', {
        duration: 3000,
        panelClass: ['blue-snackbar']
      });
    }
*/
  }
}
