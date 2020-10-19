import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {PasswordChangeConfirm} from '../../dataBaseObjects/password-change-confirm';
import {LoginService} from '../../service/base/login.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  dialogResult;
  pass: PasswordChangeConfirm = {oldPassword: '', newPassword: '', newPasswordConfirm: ''};

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PasswordChangeComponent>,
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
      this.loginService.changePassword(this.pass.oldPassword, this.pass.newPassword).subscribe(isChanged => {
          if (isChanged === true) {
            this.snackBar.open('Hasło zmieniono!', 'OK', {
              duration: 4000,
            });
            console.log('The dialog was closed');
            this.dialogRef.close(true);
          } else {
            this.snackBar.open('Wpisano niepoprawne obecne hasło!', 'OK', {
              duration: 4000,
            });
          }

        }
      );
    });
  }
}
