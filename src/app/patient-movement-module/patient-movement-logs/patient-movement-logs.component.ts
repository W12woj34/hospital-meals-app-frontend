import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';

export interface UserData {
  idLog: string;
  timestamp: string;
  target: string;
  user: string;
  log: string;
  role: string;
}

/** Constants used to fill up our data base. */

const LOGS: string[] = [
  'Złożenie zamówienia', 'Zaktualizowanie zamównienia', 'Dodanie ograniczenia żywieniowego',
  'Zaktualizowanie ograniczenia żywieniowego', 'Przyjęcie pacjenta', 'Wypisanie pacjenta'
];
const FIRST_NAMES: string[] = [
  'Jan', 'Wojciech', 'Janusz', 'Piotr', 'Kamil', 'Władysław', 'Jeremi'
];

const LAST_NAMES: string[] = [
  'Nowak', 'Kowalski', 'Tomkowski', 'Kaczyński', 'Ziobro'
];

const ROLES: string[] = [
  'Pielęgniarka Oddziałowa', 'Dietetyczka Oddziałowa'
];


@Component({
  selector: 'app-patient-movement-logs',
  templateUrl: './patient-movement-logs.component.html',
  styleUrls: ['./patient-movement-logs.component.css']
})
export class PatientMovementLogsComponent implements OnInit {


  displayedColumns: string[] = ['idLog', 'timestamp', 'target', 'user', 'log', 'type'];
  bufferDataSource;
  dataSource: MatTableDataSource<UserData>;
  users;
  selectedLogs = LOGS;
  selectedRoles = ROLES;
  roleList = ROLES;
  logList = LOGS;
  roles = new FormControl();
  logs = new FormControl();
  filterValue = '';
  dialogResult;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private location: Location) {
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
    const anotherListType: any[] = [
      ROLES[0],
      ROLES[1],
    ];

    const anotherListLogs: any[] = [
      LOGS[0],
      LOGS[1],
      LOGS[2],
      LOGS[3],
      LOGS[4],
      LOGS[5]
    ];

    this.logs.setValue(anotherListLogs);
    this.roles.setValue(anotherListType);
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }


  }

  filterRoles($event: boolean): void {
    this.selectedRoles = (this.roles.value && this.roles.value.toString()).split(',');
    this.predicateData();
  }

  filterLogs($event: boolean): void {
    this.selectedLogs = (this.logs.value && this.logs.value.toString()).split(',');
    this.predicateData();
  }

  private predicateData(): void {

    this.bufferDataSource = this.users.map(x => Object.assign({}, x))
      .filter(x => this.selectedRoles.includes(x.role))
      .filter(x => this.selectedLogs.includes(x.log));
    this.dataSource = new MatTableDataSource(this.bufferDataSource);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  goBack(): void {
    this.location.back();
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {

  return {
    idLog: id.toString(),
    timestamp: '10.10.2020 11:11:43',
    target: FIRST_NAMES[Math.round(Math.random() * (FIRST_NAMES.length - 1))],
    user: LAST_NAMES[Math.round(Math.random() * (LAST_NAMES.length - 1))],
    log: LOGS[Math.round(Math.random() * (LOGS.length - 1))],
    role: ROLES[Math.round(Math.random() * (ROLES.length - 1))]
  };
}
