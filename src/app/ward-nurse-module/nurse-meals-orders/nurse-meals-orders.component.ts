import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

export interface Zamowienia {
  idPatient: number;
  pesel: string;
  firstName: string;
  lastName: string;
  breakfast: boolean;
  lunch: boolean;
  supper: boolean;
}

const ELEMENT_DATA: Zamowienia[] = [
  {idPatient: 1, pesel: '98100403971', firstName: 'Hydrogen', lastName: 'Hydrogen', breakfast: false, lunch: false, supper: false},
  {idPatient: 2, pesel: '98100403971', firstName: 'Hydrogen', lastName: 'Helium', breakfast: false, lunch: false, supper: false},
  {idPatient: 3, pesel: '98100403971', firstName: 'Hydrogen', lastName: 'Lithium', breakfast: false, lunch: false, supper: false},
  {idPatient: 4, pesel: '98100403971', firstName: 'Hydrogen', lastName: 'Beryllium', breakfast: false, lunch: true, supper: false},
  {idPatient: 5, pesel: '98100403971', firstName: 'Hydrogen', lastName: 'Boron', breakfast: false, lunch: false, supper: false},
  {idPatient: 6, pesel: '98100403971', firstName: 'Hydrogen', lastName: 'Carbon', breakfast: false, lunch: false, supper: false},
  {idPatient: 7, pesel: '98100403971', firstName: 'Hydrogen', lastName: 'Nitrogen', breakfast: false, lunch: false, supper: false},
  {idPatient: 8, pesel: '98100403971', firstName: 'Hydrogen', lastName: 'Oxygen', breakfast: false, lunch: false, supper: false},
  {idPatient: 9, pesel: '98100403971', firstName: 'Hydrogen', lastName: 'Fluorine', breakfast: false, lunch: false, supper: false},
  {idPatient: 10, pesel: '98100403971', firstName: 'Hydrogen', lastName: 'Neon', breakfast: false, lunch: false, supper: false},
];

@Component({
  selector: 'app-nurse-meals-orders',
  templateUrl: './nurse-meals-orders.component.html',
  styleUrls: ['./nurse-meals-orders.component.css']
})
export class NurseMealsOrdersComponent implements OnInit {

  displayedColumns: string[] = ['idPatient', 'pesel', 'firstName', 'lastName', 'breakfast', 'lunch', 'supper'];
  dataSource = new MatTableDataSource<Zamowienia>(ELEMENT_DATA);
  breakfast = new SelectionModel<Zamowienia>(true, []);
  lunch = new SelectionModel<Zamowienia>(true, []);
  supper = new SelectionModel<Zamowienia>(true, []);
  filterValue = '';
  dialogResult;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  goBack(): void {
    this.location.back();
  }

  isAllSelected(which): boolean {
    if (which === 'breakfast') {
      return this.dataSource.data.filter(row => row.breakfast === true).length === this.dataSource.data.length;
    } else if (which === 'lunch') {
      return this.dataSource.data.filter(row => row.lunch === true).length === this.dataSource.data.length;
    } else if (which === 'supper') {
      return this.dataSource.data.filter(row => row.supper === true).length === this.dataSource.data.length;
    }
  }

  isAllEmpty(which): boolean {
    if (which === 'breakfast') {
      return this.dataSource.data.filter(row => row.breakfast === false).length === this.dataSource.data.length;
    } else if (which === 'lunch') {
      return this.dataSource.data.filter(row => row.lunch === false).length === this.dataSource.data.length;
    } else if (which === 'supper') {
      return this.dataSource.data.filter(row => row.supper === false).length === this.dataSource.data.length;
    }

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(which): void {
    console.log(this.dataSource);
    if (which === 'breakfast') {
      if (this.isNotAllSelected(which) || this.isAllEmpty(which)) {
        this.dataSource.data.forEach(row => row.breakfast = true);
      } else if (this.isAllSelected(which)) {
        this.dataSource.data.forEach(row => row.breakfast = false);
      }
    } else if (which === 'lunch') {
      if (this.isNotAllSelected(which) || this.isAllEmpty(which)) {
        this.dataSource.data.forEach(row => row.lunch = true);
      } else if (this.isAllSelected(which)) {
        this.dataSource.data.forEach(row => row.lunch = false);
      }
    } else if (which === 'supper') {
      if (this.isNotAllSelected(which) || this.isAllEmpty(which)) {
        this.dataSource.data.forEach(row => row.supper = true);
      } else if (this.isAllSelected(which)) {
        this.dataSource.data.forEach(row => row.supper = false);
      }

    }
  }

  changeValue(row: any, value: string): void {

    if (value === 'breakfast') {
      row.breakfast = !row.breakfast;
    } else if (value === 'lunch') {
      row.lunch = !row.lunch;
    } else if (value === 'supper') {
      row.koalcja = !row.koalcja;
    }
  }

  isNotAllSelected(value: string): boolean {
    return !(this.isAllEmpty(value) || this.isAllSelected(value));
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

  }

  makeOrder(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: 'fit-content',
      data: {result: this.dialogResult}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      console.log('The dialog was closed');
      console.log(this.dialogResult);
    });
  }
}
