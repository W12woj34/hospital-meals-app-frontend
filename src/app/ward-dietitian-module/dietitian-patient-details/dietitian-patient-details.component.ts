import {Component, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
              public dialogRef: MatDialogRef<DietitianPatientDetailsComponent>,
              public dialog: MatDialog,
              private patientService: PatientService,
              private dietService: DietService,
              private dietaryRestrictionService: DietaryRestrictionService,
              private restrictionStatusService: RestrictionStatusService,
              private patientDietService: PatientDietService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
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

        this.additionalInfos = this.fb.group({
          additionalInfos: ['', Validators.required]
        });
        this.additionalInfos.get('additionalInfos').setValue(this.patient.additionalInfo);

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
      console.log('The dialog was closed');
      this.dialogRef.close(true);
    });

    // tu trzeba będzie zapisać wszystko

  }

  addRestriction(): void {
    console.log(this.restrictions);
    // todo dodaj nową restrykcje
    this.dataSourceRestrictions = new MatTableDataSource(this.restrictions.content);
    setTimeout(() => this.dataSourceRestrictions.paginator = this.paginator.toArray()[1]);
    setTimeout(() => this.dataSourceRestrictions.sort = this.sort.toArray()[1]);
  }

  changeStatus(row: any): void {
    if (row.status.name === this.statusList.content[0].name) {
      row.status = this.statusList.content[1];
    } else {
      row.status = this.statusList.content[0];
    }

  }
}
