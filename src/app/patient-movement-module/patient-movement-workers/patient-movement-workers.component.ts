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

/** Constants used to fill up our data base. */

export interface WorkerData {
  idWorker: number;
  pesel: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  role: string;
}

const BIRTH_DATE: string[] = [
  '04.10.1998', '11.12.1990', '12.12.2001', '05.13.1980'
];
const FIRST_NAMES: string[] = [
  'Jan', 'Wojciech', 'Janusz', 'Piotr', 'Kamil', 'Władysław', 'Jeremi'
];

const LAST_NAMES: string[] = [
  'Nowak', 'Kowalski', 'Tomkowski', 'Kaczyński', 'Ziobro'
];

const ROLE: string[] = [
  'Pielęgniarka Oddziałowa', 'Dietetyczka Oddziałowa', 'Dietetyczka Kuchni', 'Ruch Chorych'
];

@Component({
  selector: 'app-patient-movement-workers',
  templateUrl: './patient-movement-workers.component.html',
  styleUrls: ['./patient-movement-workers.component.css']
})
export class PatientMovementWorkersComponent implements OnInit {


  displayedColumns: string[] = ['idWorker', 'pesel', 'firstName', 'lastName', 'birthDate', 'role'];
  bufferDataSource;
  dataSource: MatTableDataSource<WorkerData>;
  users;
  selectedRoles = ROLE;
  roleList = ROLE;
  roles = new FormControl();
  filterValue = '';
  dialogResult;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private router: Router, private location: Location) {
    // Create 100 users
    this.users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    this.bindData();
    // Assign the data to the data source for the table to render
    this.bufferDataSource = this.users.map(x => Object.assign({}, x));
    this.dataSource = new MatTableDataSource(this.bufferDataSource);
  }


  ngOnInit(): void {

    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  bindData(): void {
    const anotherListDiet: any[] = [
      ROLE[0],
      ROLE[1],
      ROLE[2],
      ROLE[3],
    ];

    this.roles.setValue(anotherListDiet);
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
    this.bufferDataSource = this.users.map(x => Object.assign({}, x))
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

/** Builds and returns a new User. */
function createNewUser(pesel: number): WorkerData {

  return {
    idWorker: pesel,
    pesel: pesel.toString(),
    firstName: FIRST_NAMES[Math.round(Math.random() * (FIRST_NAMES.length - 1))],
    lastName: LAST_NAMES[Math.round(Math.random() * (LAST_NAMES.length - 1))],
    birthDate: BIRTH_DATE[Math.round(Math.random() * (BIRTH_DATE.length - 1))],
    role: ROLE[Math.round(Math.random() * (ROLE.length - 1))]
  };
}
