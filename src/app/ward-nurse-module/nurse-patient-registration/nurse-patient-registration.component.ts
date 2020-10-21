import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Patient} from '../../dataBaseObjects/patient';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PatientService} from '../../service/base/patient.service';
import {HttpParams} from '@angular/common/http';
import {Stay} from '../../dataBaseObjects/stay';
import {EmployeeService} from '../../service/base/employee.service';
import {WardNurseService} from '../../service/base/ward-nurse.service';
import {StayService} from '../../service/base/stay.service';
import {PersonService} from '../../service/base/person.service';
import {Person} from '../../dataBaseObjects/person';

@Component({
  selector: 'app-nurse-patient-registration',
  templateUrl: './nurse-patient-registration.component.html',
  styleUrls: ['./nurse-patient-registration.component.css']
})


export class NursePatientRegistrationComponent implements OnInit {

  person: Person = {id: null, firstName: '', lastName: '', birthDate: '', pesel: null };
  patient: Patient = {id: null, additionalInfo: '', person: this.person};
  birthDate: Date = new Date();
  color: ThemePalette = 'primary';
  firstTime = false;
  dialogResult;

  constructor(public dialogRef: MatDialogRef<NursePatientRegistrationComponent>,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private snackBar: MatSnackBar,
              private personService: PersonService,
              private patientService: PatientService,
              private employeeService: EmployeeService,
              private nurseService: WardNurseService,
              private stayService: StayService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (Number(this.person.pesel) < 10000000000 || Number(this.person.pesel) > 99999999999) {
      this.snackBar.open('Niepoprawny pesel', 'OK', {
        duration: 4000,
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: 'fit-content',
      data: {result: this.dialogResult}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        if (this.firstTime === false) {
          const httpParams = new HttpParams().set('pesel', this.person.pesel);
          this.personService.getPageSpec('', httpParams).subscribe(people => {
            if (people.content.length === 0) {
              this.snackBar.open('Brak pacjenta w bazie danych', 'OK', {
                duration: 4000,
              });
              return;
            } else {
              this.patient = {
                id: people.content[0].id,
                additionalInfo: '',
                person: this.person
              };
              this.patientService.post(this.patient, '').subscribe(() => {
                this.createStay(people.content[0].id);
              });
            }
          });
        } else {
          this.person.birthDate = this.datePipe.transform(this.birthDate, 'yyyy-MM-dd');
          this.personService.post(this.person, '').subscribe( person => {
            this.person.id = person.id;
            this.patientService.post(this.patient, '').subscribe(patient => {
              this.createStay(patient.id);
            });
          });
        }
      }
    });

  }

  createStay(patientId: number): void {
    this.employeeService.getEmployeeData('data/personal').subscribe(user => {
      this.nurseService.get(user.id.toString()).subscribe(nurse => {
        const stay: Stay = {
          id: null,
          patientId,
          admissionDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
          releaseDate: null,
          archived: false,
          ward: nurse.ward
        };
        this.stayService.post(stay, '').subscribe(_ => {
          this.snackBar.open('Dodano pacjenta!', 'OK', {
            duration: 4000,
          });
          this.dialogRef.close(true);
        });
      });
    });
  }

}
