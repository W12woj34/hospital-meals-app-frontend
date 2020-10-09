import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {NursePatientDetailsComponent} from '../nurse-patient-details/nurse-patient-details.component';
import {Router} from '@angular/router';
import {NursePatientRegistrationComponent} from '../nurse-patient-registration/nurse-patient-registration.component';


export interface UserData {
  idPatient: string;
  pesel: string;
  firstName: string;
  lastName: string;
  dateFrom: string;
  diet: string;
}

/** Constants used to fill up our data base. */

const DATE_FROM: string[] = [
  '04.10.1998', '11.12.1990', '12.12.2001', '05.13.1980'
];
const FIRST_NAMES: string[] = [
  'Jan', 'Wojciech', 'Janusz', 'Piotr', 'Kamil', 'Władysław', 'Jeremi'
];

const LAST_NAMES: string[] = [
  'Nowak', 'Kowalski', 'Tomkowski', 'Kaczyński', 'Ziobro'
];

const DIETA: string[] = [
  'Indywidualna', 'Zwykła', 'Wysokobiałkowa', 'Węglowodanowa', 'Scisła', 'Bogato Resztkowa'
];

@Component({
  selector: 'app-nurse-main',
  templateUrl: './nurse-main.component.html',
  styleUrls: ['./nurse-main.component.css']
})
export class NurseMainComponent implements OnInit {

  displayedColumns: string[] = ['pesel', 'firstName', 'lastName', 'dateFrom', 'diet'];
  bufferDataSource;
  dataSource: MatTableDataSource<UserData>;
  users;
  selectedDiets = DIETA;
  dietList = DIETA;
  diets = new FormControl();
  filterValue = '';
  dialogResult;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private router: Router) {
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
      DIETA[0],
      DIETA[1],
      DIETA[2],
      DIETA[3],
      DIETA[4],
      DIETA[5]
    ];

    this.diets.setValue(anotherListDiet);
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    console.log(this.selectedDiets);
    console.log(this.filterValue);
    console.log(this.dataSource);

  }

  openPopup(id: string): void {
    const dialogRef = this.dialog.open(NursePatientDetailsComponent, {
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

    this.selectedDiets = (this.diets.value && this.diets.value.toString()).split(',');
    this.predicateData();
  }

  private predicateData(): void {
    this.bufferDataSource = this.users.map(x => Object.assign({}, x))
      .filter(x => this.selectedDiets.includes(x.diet));
    this.dataSource = new MatTableDataSource(this.bufferDataSource);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openRegistration(): void {
    const dialogRef = this.dialog.open(NursePatientRegistrationComponent, {
      minWidth: '50%',
      data: {result: this.dialogResult}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      console.log('The dialog was closed');
      console.log(this.dialogResult);
    });
  }

  openOrders(): void {
    this.router.navigateByUrl('wardNurseOrders');
  }
}

/** Builds and returns a new User. */
function createNewUser(pesel: number): UserData {

  return {
    idPatient: pesel.toString(),
    pesel: pesel.toString(),
    firstName: FIRST_NAMES[Math.round(Math.random() * (FIRST_NAMES.length - 1))],
    lastName: LAST_NAMES[Math.round(Math.random() * (LAST_NAMES.length - 1))],
    dateFrom: DATE_FROM[Math.round(Math.random() * (DATE_FROM.length - 1))],
    diet: DIETA[Math.round(Math.random() * (DIETA.length - 1))]
  };
}
