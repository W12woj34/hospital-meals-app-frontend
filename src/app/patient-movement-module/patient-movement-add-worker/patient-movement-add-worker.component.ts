import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';
import {Ward} from '../../dataBaseObjects/ward';
import {WardService} from '../../service/base/ward.service';
import {Employee} from '../../dataBaseObjects/employee';
import {Login} from '../../dataBaseObjects/login';
import {HttpParams} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PatientMovementService} from '../../service/base/patient-movement.service';
import {DietitianService} from '../../service/base/dietitian.service';
import {MainKitchenDietitianService} from '../../service/base/main-kitchen-dietitan.service';
import {WardNurseService} from '../../service/base/ward-nurse.service';
import {PersonService} from '../../service/base/person.service';
import {LoginService} from '../../service/base/login.service';
import {EmployeeService} from '../../service/base/employee.service';
import {DatePipe} from '@angular/common';
import {Person} from '../../dataBaseObjects/person';
import {WardNurse} from '../../dataBaseObjects/ward-nurse';

const ROLES: string[] = [
  'Dietetyk Oddziałowy', 'Ruch Chorych', 'Dietetyk Kuchni', 'Pielęgniarka Oddziałowa'
];

@Component({
  selector: 'app-patient-movement-add-worker',
  templateUrl: './patient-movement-add-worker.component.html',
  styleUrls: ['./patient-movement-add-worker.component.css']
})
export class PatientMovementAddWorkerComponent implements OnInit {

  roles = ROLES;
  wards: Ward[];
  worker: Employee = {id: null, firstName: '', lastName: '', birthDate: '', pesel: null, loginId: null};
  login: Login = {id: null, username: '', password: ''};
  role = '';
  passwordConfirm = '';
  birthDate: Date = new Date();
  ward: Ward = null;
  color: ThemePalette = 'primary';
  firstTime = false;
  dialogResult;

  constructor(public dialogRef: MatDialogRef<PatientMovementAddWorkerComponent>,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private snackBar: MatSnackBar,
              private wardService: WardService,
              private personService: PersonService,
              private employeeService: EmployeeService,
              private loginService: LoginService,
              private wardNurseService: WardNurseService,
              private kitchenDietitianService: MainKitchenDietitianService,
              private wardDietitianService: DietitianService,
              private patientMovementService: PatientMovementService) {
  }

  ngOnInit(): void {

    this.wardService.getPage('').subscribe(wards => {
      this.wards = wards.content;
    });
  }

  onSubmit(): void {

    if (Number(this.worker.pesel) < 10000000000 || Number(this.worker.pesel) > 99999999999) {
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
          console.log('Zaznaczono że powinien być w bazie');

          const httpParams = new HttpParams().set('pesel', this.worker.pesel);
          this.personService.getPageSpec('', httpParams).subscribe(workers => {
            if (workers.content.length === 0) {
              console.log('Nie ma go w bazie');
              this.snackBar.open('Brak pracownika w bazie danych', 'OK', {
                duration: 4000,
              });
              return;
            } else {
              console.log('Jest w bazie');
              this.employeeService.isExist(String(workers.content[0].id))
                .subscribe(isExists => {
                  if (isExists === true) {
                    console.log('Jest zatrudniony');
                    this.snackBar.open('Pracownik jest już zatrudniony!', 'OK', {
                      duration: 4000,
                    });
                    return;
                  }
                  console.log('Nie jest zatrudniony');
                  this.worker.birthDate = workers.content[0].birthDate;
                  this.worker.firstName = workers.content[0].firstName;
                  this.worker.lastName = workers.content[0].lastName;
                  this.registerWorker(this.worker);
                });
            }
          });

        } else {
          console.log('Zaznaczono że nie powinien być w bazie');
          const httpParams = new HttpParams().set('pesel', this.worker.pesel);
          this.personService.getPageSpec('', httpParams).subscribe(workers => {
            if (workers.content.length !== 0) {
              console.log('Jest już w bazie');
              this.snackBar.open('Pracownik już znajduje się w bazie danych!', 'OK', {
                duration: 4000,
              });
              return;
            } else {
              this.worker.birthDate = this.datePipe.transform(this.birthDate, 'yyyy-MM-dd');
              this.registerWorker(this.worker);
            }
          });

        }
      }
    });

  }


  registerWorker(worker: Person): void {

    this.loginService.post(this.login, '').subscribe(login => {
      console.log('utworzono dane logowania');
      this.worker = {
        id: worker.id,
        firstName: worker.firstName,
        lastName: worker.lastName,
        birthDate: worker.birthDate,
        pesel: worker.pesel,
        loginId: login.id
      };
      console.log(this.role);
      if (this.role === ROLES[0]) {
        this.wardDietitianService.post(this.worker, '').subscribe(() => {
          this.displayInfo();
        });
      } else if (this.role === ROLES[1]) {
        this.patientMovementService.post(this.worker, '').subscribe(() => {
          this.displayInfo();
        });
      } else if (this.role === ROLES[2]) {
        this.kitchenDietitianService.post(this.worker, '').subscribe(() => {
          this.displayInfo();
        });
      } else if (this.role === ROLES[4]) {
        const dto: WardNurse = {
          id: this.worker.id,
          firstName: this.worker.firstName,
          lastName: this.worker.lastName,
          birthDate: this.worker.birthDate,
          pesel: this.worker.pesel,
          loginId: this.worker.id,
          ward: this.ward
        };

        this.wardNurseService.post(dto, '').subscribe(() => {
          this.displayInfo();
        });
      }
    });
  }

  isWardNurse(): boolean {
    return this.role === this.roles[3];
  }

  displayInfo(): void {
    this.snackBar.open('Dodano Pracownika', 'OK', {
      duration: 4000,
    });
    this.dialogRef.close(true);
  }
}
