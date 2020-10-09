import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';

const DIETA: string[] = [
  'Indywidualna', 'Zwykła', 'Wysokobiałkowa', 'Węglowodanowa', 'Scisła', 'Bogato Resztkowa'
];

const RESTRYKCJA: string[] = [
  'Aktualne', 'Nieaktualne'
];

export interface Diets {
  diet: string;
  dateFrom: string;
  dateTo: string;

}

export interface Restrictions {
  restriction: string;
  status: string;

}

function createDiet(): Diets[] {
  return [{
    diet: 'Wysokobiałkowa',
    dateFrom: '07.08.2020',
    dateTo: ''
  },
    {
      diet: 'Zwykła',
      dateFrom: '01.08.2020',
      dateTo: '07.08.2020'
    }];
}

@Component({
  selector: 'app-dietitian-patient-details',
  templateUrl: './dietitian-patient-details.component.html',
  styleUrls: ['./dietitian-patient-details.component.css']
})
export class DietitianPatientDetailsComponent implements OnInit {

  dialogResult;
  currentDiet: FormGroup;
  additionalInfos: FormGroup;
  patient = createNewUser();
  displayedColumnsDiet: string[] = ['diet', 'dateFrom', 'dateTo'];
  displayedColumnsRestriction: string[] = ['restriction', 'status'];
  dataSourceDiet: MatTableDataSource<Diets>;
  dataSourceRestrictions: MatTableDataSource<Restrictions>;
  dietList = DIETA;
  statusList = RESTRYKCJA;
  diets = createDiet();
  restrictions = [];
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DietitianPatientDetailsComponent>, public dialog: MatDialog) {
    this.dataSourceDiet = new MatTableDataSource(this.diets);
    this.dataSourceRestrictions = new MatTableDataSource(this.restrictions);
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {

    setTimeout(() => this.dataSourceDiet.paginator = this.paginator.toArray()[0]);
    setTimeout(() => this.dataSourceDiet.sort = this.sort.toArray()[0]);
    setTimeout(() => this.dataSourceRestrictions.paginator = this.paginator.toArray()[1]);
    setTimeout(() => this.dataSourceRestrictions.sort = this.sort.toArray()[1]);
    this.currentDiet = this.fb.group({
      currentDiet: ['', Validators.required]
    });
    this.additionalInfos = this.fb.group({
      additionalInfos: ['', Validators.required]
    });

    const toSelect = this.diets[0].diet;
    this.currentDiet.get('currentDiet').setValue(toSelect);

    this.additionalInfos.get('additionalInfos').setValue(this.patient.additionalInfo);

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
      if (this.dialogResult === false){
        return;
      }
      console.log('The dialog was closed');
      this.dialogRef.close(true);
    });

    // tu trzeba będzie zapisać wszystko

  }

  addRestriction(): void {
    console.log(this.restrictions);
    this.restrictions = this.restrictions.concat([{
      restriction: '0nowa restrykcja xddddddddddddddddddddddddddddddd',
      status: this.statusList[0]
    }]);
    this.dataSourceRestrictions = new MatTableDataSource(this.restrictions);
    setTimeout(() => this.dataSourceRestrictions.paginator = this.paginator.toArray()[1]);
    setTimeout(() => this.dataSourceRestrictions.sort = this.sort.toArray()[1]);
  }

  changeStatus(row: any): void {
    if (row.status === this.statusList[0]) {
      row.status = this.statusList[1];
    } else {
      row.status = this.statusList[0];
    }

  }
}

/** Builds and returns a new User. */
function createNewUser(): PersonData {

  return {
    idPatient: '11',
    pesel: '98100403971',
    firstName: 'Wojciech',
    lastName: 'Szewczuk',
    ward: 'Onkologia',
    birthDate: '04.10.1998',
    additionalInfo: 'Odrzywki, tylko z kfd, tylko paskudne xddddddddddddddddddddddddddddd, bięso, mięso, mięso'
  };
}

export interface PersonData {
  idPatient: string;
  pesel: string;
  firstName: string;
  lastName: string;
  ward: string;
  birthDate: string;
  additionalInfo: string;
}
