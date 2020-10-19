import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MealService} from '../../service/base/meal.service';
import {PatientMealOrder} from '../../dataBaseObjects/patient-meal-order';
import {Page} from '../../dataBaseObjects/page';

export interface Zamowienia {
  idPatient: number;
  pesel: string;
  firstName: string;
  lastName: string;
  breakfast: boolean;
  lunch: boolean;
  supper: boolean;
}

@Component({
  selector: 'app-nurse-meals-orders',
  templateUrl: './nurse-meals-orders.component.html',
  styleUrls: ['./nurse-meals-orders.component.css']
})
export class NurseMealsOrdersComponent implements OnInit {

  patients: Page<PatientMealOrder>;
  displayedColumns: string[] = ['pesel', 'firstName', 'lastName', 'birthDate', 'breakfast', 'lunch', 'supper'];
  dataSource: MatTableDataSource<PatientMealOrder>;
  breakfast = new SelectionModel<Zamowienia>(true, []);
  lunch = new SelectionModel<Zamowienia>(true, []);
  supper = new SelectionModel<Zamowienia>(true, []);
  filterValue = '';
  dialogResult: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              private router: Router,
              private location: Location,
              private mealService: MealService) {
  }

  ngOnInit(): void {

    this.mealService.getMealOrders()
      .subscribe(patients => {
        this.patients = patients;
        this.dataSource = new MatTableDataSource(this.patients.content);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
        });

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
      row.supper = !row.supper;
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
      if (this.dialogResult){
        console.log(this.dialogResult);
        this.mealService.setPatientMeals(this.patients.content, 'meal-order').subscribe();
      }
    });
  }
}
