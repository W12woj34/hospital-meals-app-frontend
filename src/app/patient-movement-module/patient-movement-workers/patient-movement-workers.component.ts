import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {PatientMovementWorkerDetailsComponent} from '../patient-movement-worker-details/patient-movement-worker-details.component';
import {Location} from '@angular/common';
import {PatientMovementAddWorkerComponent} from '../patient-movement-add-worker/patient-movement-add-worker.component';
import {EmployeeData} from '../../dataBaseObjects/employee-data';
import {EmployeeService} from '../../service/base/employee.service';
import {Page} from '../../dataBaseObjects/page';

/** Constants used to fill up our data base. */

const ROLE: string[] = [
  'Pielęgniarka Oddziałowa', 'Dietetyk Oddziałowy', 'Dietetyk Kuchni', 'Ruch Chorych'
];

@Component({
  selector: 'app-patient-movement-workers',
  templateUrl: './patient-movement-workers.component.html',
  styleUrls: ['./patient-movement-workers.component.css']
})
export class PatientMovementWorkersComponent implements OnInit {


  displayedColumns: string[] = ['id', 'pesel', 'firstName', 'lastName', 'birthDate', 'role'];
  bufferDataSource;
  dataSource: MatTableDataSource<EmployeeData>;
  users: Page<EmployeeData>;
  selectedRoles = ROLE;
  roleList = ROLE;
  roles = new FormControl();
  filterValue = '';
  dialogResult;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              private router: Router,
              private location: Location,
              private employeeService: EmployeeService) {
  }


  ngOnInit(): void {

    this.employeeService.getEmployeesData('data')
      .subscribe(employees => {
        this.users = employees;
        this.bindData();
        this.bufferDataSource = this.users.content.map(x => Object.assign({}, x));
        this.dataSource = new MatTableDataSource(this.bufferDataSource);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
      });


  }

  bindData(): void {
    const anotherListRoles: string[] = this.roleList;

    this.roles.setValue(anotherListRoles);
  }

  goBack(): void {
    this.location.back();
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    console.log(this.selectedRoles);
    console.log(this.filterValue);
    console.log(this.dataSource);

  }

  addWorker(): void {
    const dialogRef = this.dialog.open(PatientMovementAddWorkerComponent, {
      minWidth: '50%',
      data: {result: this.dialogResult}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      console.log('The dialog was closed');
      console.log(this.dialogResult);
    });
  }

  openPopup(id: string): void {
    const dialogRef = this.dialog.open(PatientMovementWorkerDetailsComponent, {
      minWidth: '50%',
      data: {id, result: this.dialogResult}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      console.log('The dialog was closed');
      console.log(this.dialogResult);
    });
  }


  filterDiets($event: boolean): void {

    this.selectedRoles = (this.roles.value && this.roles.value.toString()).split(',');
    this.predicateData();
  }

  private predicateData(): void {
    this.bufferDataSource = this.users.content.map(x => Object.assign({}, x))
      .filter(x => this.selectedRoles.includes(x.role));
    this.dataSource = new MatTableDataSource(this.bufferDataSource);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

