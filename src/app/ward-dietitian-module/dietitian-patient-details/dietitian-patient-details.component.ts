import {Component, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';
import {PatientService} from '../../service/base/patient.service';
import {DietService} from '../../service/base/diet.service';
import {DietaryRestrictionService} from '../../service/base/dietary-restriction.service';
import {RestrictionStatusService} from '../../service/base/restriction-status.service';
import {PatientDietService} from '../../service/base/patient-diet.service';
import {HttpParams} from '@angular/common/http';
import {PatientData} from '../../dataBaseObjects/patient-data';
import {Page} from '../../dataBaseObjects/page';
import {PatientDiet} from '../../dataBaseObjects/patient-diet';
import {DietaryRestriction} from '../../dataBaseObjects/dietary-restriction';
import {Diet} from '../../dataBaseObjects/diet';
import {RestrictionStatus} from '../../dataBaseObjects/restriction-status';
import {Patient} from '../../dataBaseObjects/patient';
import {PersonService} from '../../service/base/person.service';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DietitianAddRestrictionComponent} from '../dietitian-add-restriction/dietitian-add-restriction.component';
import {MealService} from '../../service/base/meal.service';


@Component({
  selector: 'app-dietitian-patient-details',
  templateUrl: './dietitian-patient-details.component.html',
  styleUrls: ['./dietitian-patient-details.component.css']
})
export class DietitianPatientDetailsComponent implements OnInit {


  dialogResult;
  currentDiet: FormGroup;
  additionalInfos: FormGroup;
  patient: PatientData;
  displayedColumnsDiet: string[] = ['diet', 'startDate', 'endDate'];
  displayedColumnsRestriction: string[] = ['restriction', 'status'];
  dataSourceDiet: MatTableDataSource<PatientDiet>;
  dataSourceRestrictions: MatTableDataSource<DietaryRestriction>;
  dietList: Page<Diet>;
  statusList: Page<RestrictionStatus>;
  diets: Page<PatientDiet>;
  restrictions: Page<DietaryRestriction>;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private datePipe: DatePipe,
              public dialogRef: MatDialogRef<DietitianPatientDetailsComponent>,
              public dialog: MatDialog,
              private patientService: PatientService,
              private personService: PersonService,
              private dietService: DietService,
              private mealService: MealService,
              private dietaryRestrictionService: DietaryRestrictionService,
              private restrictionStatusService: RestrictionStatusService,
              private patientDietService: PatientDietService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.additionalInfos = new FormGroup({
      additionalInfos: new FormControl()
    });

    this.currentDiet = new FormGroup({
      currentDiet: new FormControl()
    });
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
    const httpParams = new HttpParams().set('patientId', this.data.id);
    this.patientService.getPatientData('data/' + this.data.id)
      .subscribe(patient => {
        this.patient = patient;
        if (this.patient.diet === '') {
          this.patient.diet = 'BRAK';
        }

        this.additionalInfos.get('additionalInfos').setValue(this.patient.additionalInfo);
        console.log();
      });

    this.dietaryRestrictionService.getPageSpec('', httpParams, 0, 20)
      .subscribe(restrictions => {
        this.restrictions = restrictions;
        this.dataSourceRestrictions = new MatTableDataSource(this.restrictions.content.reverse());

        this.restrictionStatusService.getPage()
          .subscribe(statuses => {
            this.statusList = statuses;
            setTimeout(() => this.dataSourceRestrictions.paginator = this.paginator.toArray()[1]);
            setTimeout(() => this.dataSourceRestrictions.sort = this.sort.toArray()[1]);
          });

      });

    this.patientDietService.getPageSpec('', httpParams, 0, 20, ['startDate'])
      .subscribe(diets => {
        this.diets = diets;
        this.dataSourceDiet = new MatTableDataSource(this.diets.content.reverse());

        this.dietService.getPage()
          .subscribe(diet => {
            this.dietList = diet;
            setTimeout(() => this.dataSourceDiet.paginator = this.paginator.toArray()[0]);
            setTimeout(() => this.dataSourceDiet.sort = this.sort.toArray()[0]);
          });

      });


  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
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

      this.personService.get(this.data.id).subscribe(person => {

        const patient: Patient = {id: this.data.id, additionalInfo: this.additionalInfos.get('additionalInfos').value, person};
        this.patientService.put(patient, this.data.id).subscribe();
      });

      console.log(this.currentDiet.get('currentDiet').value);
      if (this.currentDiet.get('currentDiet').value !== null && this.currentDiet.get('currentDiet').value !== '') {
        this.diets.content.forEach(d => {
          if (d.endDate === null || d.endDate === '') {
            d.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
          }
          this.patientDietService.put(d, String(d.id)).subscribe();
        });
        const patientDietDto: PatientDiet = {
          id: null,
          startDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
          endDate: null,
          patientId: this.data.id,
          diet: this.currentDiet.get('currentDiet').value
        };
        this.patientDietService.post(patientDietDto, '').subscribe();
        this.mealService.setPatientMealsDiet(this.currentDiet.get('currentDiet').value, 'meal-order/' + String(this.data.id))
          .subscribe();
      }


      this.restrictions.content.forEach(r => {
        this.dietaryRestrictionService.put(r, String(r.id)).subscribe();
      });

      this.snackBar.open('Zaktualizowano dane pacjenta!', 'OK', {
        duration: 4000,
      });
      this.dialogRef.close(true);
    });

  }

  addRestriction(): void {
    const dialogRef = this.dialog.open(DietitianAddRestrictionComponent, {
      width: '30%',
      data: {id: this.data.id, result: this.dialogResult}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }
      this.getNewRestrictions();

    });
  }

  getNewRestrictions(): void {
    const httpParams = new HttpParams().set('patientId', this.data.id);
    this.dietaryRestrictionService.getPageSpec('', httpParams, 0, 20)
      .subscribe(restrictions => {
        this.restrictions = restrictions;
        this.dataSourceRestrictions = new MatTableDataSource(this.restrictions.content.reverse());
        setTimeout(() => this.dataSourceRestrictions.paginator = this.paginator.toArray()[1]);
        setTimeout(() => this.dataSourceRestrictions.sort = this.sort.toArray()[1]);
      });

  }

  changeStatus(row: any): void {
    if (row.status.name === this.statusList.content[0].name) {
      row.status = this.statusList.content[1];
    } else {
      row.status = this.statusList.content[0];
    }

  }
}
