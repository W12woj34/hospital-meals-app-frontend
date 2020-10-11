import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PasswordChangeComponent} from '../password-change/password-change.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  dialogResult;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onPassChange(): void {
    const dialogRef = this.dialog.open(PasswordChangeComponent, {
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
    });

    // tu trzeba będzie zapisać wszystko

  }
}
