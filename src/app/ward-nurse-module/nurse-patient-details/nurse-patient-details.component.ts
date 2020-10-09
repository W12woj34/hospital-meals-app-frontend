import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';

export interface Diets {
  diet: string;
  dateFrom: string;
  dateTo: string;

}

export interface Stays {
  ward: string;
  dateFrom: string;
  dateTo: string;
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

function createStays(): Stays[] {
  return [{
    ward: 'Onkologia',
    dateFrom: '07.10.2020',
    dateTo: ''
  },
    {
    ward: 'Kardiologia',
    dateFrom: '01.08.2020',
    dateTo: '07.08.2020'
  },
    {
      ward: 'Okulistyka',
      dateFrom: '07.02.2019',
      dateTo: '16.02.2019'
    }];
}

@Component({
  selector: 'app-nurse-patient-details',
  templateUrl: './nurse-patient-details.component.html',
  styleUrls: ['./nurse-patient-details.component.css']
})
export class NursePatientDetailsComponent implements OnInit {

  dialogResult;
  patient = createNewUser();
  displayedColumnsDiet: string[] = ['diet', 'dateFrom', 'dateTo'];
  displayedColumnsStay: string[] = ['ward', 'dateFrom', 'dateTo'];
  dataSourceDiet: MatTableDataSource<Diets>;
  dataSourceStay: MatTableDataSource<Stays>;
  diets = createDiet();
  stays = createStays();
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(public dialogRef: MatDialogRef<NursePatientDetailsComponent>, public dialog: MatDialog) {
    this.dataSourceDiet = new MatTableDataSource(this.diets);
    this.dataSourceStay = new MatTableDataSource(this.stays);
  }

  ngOnInit(): void {

    setTimeout(() => this.dataSourceDiet.paginator = this.paginator.toArray()[0]);
    setTimeout(() => this.dataSourceDiet.sort = this.sort.toArray()[0]);
    setTimeout(() => this.dataSourceStay.paginator = this.paginator.toArray()[1]);
    setTimeout(() => this.dataSourceStay.sort = this.sort.toArray()[1]);

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
      if (this.dialogResult === false){
        return;
      }
      console.log('The dialog was closed');
      this.dialogRef.close(true);
    });

    // tu trzeba będzie zapisać wszystko

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
