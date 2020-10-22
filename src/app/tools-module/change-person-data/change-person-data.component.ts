import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PersonService} from '../../service/base/person.service';
import {Person} from '../../dataBaseObjects/person';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-change-person-data',
  templateUrl: './change-person-data.component.html',
  styleUrls: ['./change-person-data.component.css']
})
export class ChangePersonDataComponent implements OnInit {

  person: Person;
  birthDate;

  constructor(public dialogRef: MatDialogRef<ChangePersonDataComponent>,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private snackBar: MatSnackBar,
              private personService: PersonService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.personService.get(this.data.id).subscribe(person => {
      this.person = person;
      this.birthDate = new Date(person.birthDate); // '1968-11-16T00:00:00'
    });

  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: 'fit-content',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }
      this.person.birthDate = this.datePipe.transform(this.birthDate, 'yyyy-MM-dd');
      this.personService.put(this.person, String(this.person.id)).subscribe(() => {
        this.dialogRef.close(true);
      });
    });

  }
}
