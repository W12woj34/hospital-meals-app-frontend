import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';

export interface UserData {
  pesel: string;
  firstName: string;
  lastName: string;
  ward: string;
  diet: string;
}

/** Constants used to fill up our data base. */

const WARDS: string[] = [
  'Ortopedia', 'Laryngologia', 'Chirurgia', 'Chirurgia Naczyniowa', 'Okulistyka', 'Kardiologia'
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
  selector: 'app-dietitian-main',
  templateUrl: './dietitian-main.component.html',
  styleUrls: ['./dietitian-main.component.css']
})
export class DietitianMainComponent implements OnInit {

  displayedColumns: string[] = ['pesel', 'firstName', 'lastName', 'ward', 'diet'];
  bufferDataSource;
  dataSource: MatTableDataSource<UserData>;
  users;
  selectedWards = LAST_NAMES;
  selectedDiets = DIETA;
  dietList = DIETA;
  wardList = WARDS;
  diets = new FormControl();
  wards = new FormControl();
  filterValue = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
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

    const anotherListWard: any[] = [
      WARDS[0],
      WARDS[1],
      WARDS[2],
      WARDS[3],
      WARDS[4],
      WARDS[5]
    ];

    this.wards.setValue(anotherListWard);
    this.diets.setValue(anotherListDiet);
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    console.log(this.selectedWards);
    console.log(this.selectedDiets);
    console.log(this.filterValue);
    console.log(this.dataSource);

  }

  openPopup(row: any): void {
    row.progress = 0;
  }

  filterDiets($event: boolean): void {

    this.selectedDiets = (this.diets.value && this.diets.value.toString()).split(',');
    this.predicateData();
  }

  filterWards($event: boolean): void {

    this.selectedWards = (this.wards.value && this.wards.value.toString()).split(',');
    this.predicateData();
  }

  private predicateData(): void {
    this.bufferDataSource = this.users.map(x => Object.assign({}, x))
      .filter(x => this.selectedDiets.includes(x.diet));
    this.bufferDataSource.filter(x => this.selectedWards.includes(x.ward));
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
function createNewUser(pesel: number): UserData {

  return {
    pesel: pesel.toString(),
    firstName: FIRST_NAMES[Math.round(Math.random() * (FIRST_NAMES.length - 1))],
    lastName: LAST_NAMES[Math.round(Math.random() * (LAST_NAMES.length - 1))],
    ward: WARDS[Math.round(Math.random() * (WARDS.length - 1))],
    diet: DIETA[Math.round(Math.random() * (DIETA.length - 1))]
  };
}
