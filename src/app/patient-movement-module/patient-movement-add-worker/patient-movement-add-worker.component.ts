import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../service/api.service';
import {NgForm} from '@angular/forms';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';
import {Ward} from '../../dataBaseObjects/Ward';

export interface Worker {
  pesel: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  role: string;
  ward: number;
}

const ROLES: string[] = [
  'Dietetyczka Oddziałowa', 'Ruch Chorych', 'Dietetyczka Kuchni', 'Pielęgniarka Oddziałowa'
];

const WARDS: Ward[] = [
  {id: 1, name: 'Onkologia'}, {id: 2, name: 'Chirurgia'}, {id: 3, name: 'Kardiologia'}, {id: 4, name: 'Okulistyka'}
];

@Component({
  selector: 'app-patient-movement-add-worker',
  templateUrl: './patient-movement-add-worker.component.html',
  styleUrls: ['./patient-movement-add-worker.component.css']
})
export class PatientMovementAddWorkerComponent implements OnInit {

  roles = ROLES;
  wards = WARDS;
  worker: Worker = {pesel: null, firstName: '', lastName: '', birthDate: '', role: '', ward: null};
  color: ThemePalette = 'primary';
  firstTime = false;
  dialogResult;

  constructor(public dialogRef: MatDialogRef<PatientMovementAddWorkerComponent>,
              public dialog: MatDialog,
              private api: ApiService) {
  }

  ngOnInit(): void {
  }

  onSubmit(workerForm: NgForm): void {
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

      /*  this.api.login('/login', this.patient).subscribe(
          (r => {

            }
          ));

       */
// tu trzeba będzie zapisać wszystko
      console.log('The dialog was closed');
      this.dialogRef.close(true);
    });


  }

  isWardNurse(): boolean {
    return this.worker.role === this.roles[3];
  }
}
