import {Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';
import {PatientService} from '../../service/base/patient.service';
import {PatientData} from '../../dataBaseObjects/patient-data';
import {StayService} from '../../service/base/stay.service';
import {Stay} from '../../dataBaseObjects/stay';
import {Page} from '../../dataBaseObjects/page';
import {PatientDietService} from '../../service/base/patient-diet.service';
import {PatientDiet} from '../../dataBaseObjects/patient-diet';
import {HttpParams} from '@angular/common/http';
import {MealService} from '../../service/base/meal.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ChangePersonDataComponent} from '../../tools-module/change-person-data/change-person-data.component';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-nurse-patient-details',
  templateUrl: './nurse-patient-details.component.html',
  styleUrls: ['./nurse-patient-details.component.css']
})
export class NursePatientDetailsComponent implements OnInit {

  dialogResult;
  patient: PatientData;
  displayedColumnsDiet: string[] = ['diet', 'startDate', 'endDate'];
  displayedColumnsStay: string[] = ['ward', 'admissionDate', 'releaseDate'];
  dataSourceDiet: MatTableDataSource<PatientDiet>;
  dataSourceStay: MatTableDataSource<Stay>;
  diets: Page<PatientDiet>;
  stays: Page<Stay>;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(public dialogRef: MatDialogRef<NursePatientDetailsComponent>,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private patientService: PatientService,
              private patientDietService: PatientDietService,
              private stayService: StayService,
              private mealService: MealService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    console.log(this.data);
    const httpParams = new HttpParams().set('patientId', this.data.id);
    this.patientService.getPatientData('data/' + this.data.id)
      .subscribe(patient => {
        this.patient = patient;
        if (this.patient.diet === '') {
          this.patient.diet = 'BRAK';
        }
      });

    this.stayService.getPageSpec('', httpParams, 0, 20, ['admissionDate'])
      .subscribe(stays => {
        this.stays = stays;
        this.dataSourceStay = new MatTableDataSource(this.stays.content.reverse());
        setTimeout(() => this.dataSourceStay.paginator = this.paginator.toArray()[1]);
        setTimeout(() => this.dataSourceStay.sort = this.sort.toArray()[1]);
      });

    this.patientDietService.getPageSpec('', httpParams, 0, 20, ['startDate'])
      .subscribe(diets => {
        this.diets = diets;
        this.dataSourceDiet = new MatTableDataSource(this.diets.content.reverse());
        setTimeout(() => this.dataSourceDiet.paginator = this.paginator.toArray()[0]);
        setTimeout(() => this.dataSourceDiet.sort = this.sort.toArray()[0]);
      });


  }

  onBack(): void {
    this.dialogRef.close(false);
  }

  onDischarge(): void {
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
      this.mealService.getPatientMealOrders(this.data.id).subscribe(orders => {

        orders.content.forEach(o => {
          o.breakfast = false;
          o.lunch = false;
          o.supper = false;
        });

        this.mealService.setPatientMeals(orders.content, 'meal-order').subscribe(() => {

          const httpParams = new HttpParams().set('patientId', String(this.patient.id)).set('archived', 'false');

          this.stayService.getPageSpec('', httpParams).subscribe(stay => {

            const dto = stay.content[0];
            dto.archived = true;
            dto.releaseDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

            this.stayService.put(dto, String(dto.id)).subscribe(() => {

              this.snackBar.open('Wypisano pacjenta!', 'OK', {
                duration: 4000,
              });
              this.dialogRef.close(true);
            });
          });
        });
      });
    });

  }

  onEdit(): void {
    const dialogRef = this.dialog.open(ChangePersonDataComponent, {
      minWidth: 'fit-content',
      data: {id: this.data.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }
      console.log('The dialog was closed');
      this.dialogRef.close(true);
    });
  }
}
