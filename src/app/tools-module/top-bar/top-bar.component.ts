import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PasswordChangeComponent} from '../password-change/password-change.component';
import {EmployeeData} from '../../dataBaseObjects/employee-data';
import {EmployeeService} from '../../service/base/employee.service';
import {AuthService} from '../../login-module/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  dialogResult;
  employee: EmployeeData;
  constructor(public dialog: MatDialog,
              private employeeService: EmployeeService,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.employeeService.getEmployeeData('data/personal')
      .subscribe(employee => this.employee = employee);
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

  }

  logout(): void {
    this.authService.logout();
  }
}
