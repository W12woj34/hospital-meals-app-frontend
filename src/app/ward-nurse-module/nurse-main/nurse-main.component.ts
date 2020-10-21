import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {NursePatientDetailsComponent} from '../nurse-patient-details/nurse-patient-details.component';
import {Router} from '@angular/router';
import {NursePatientRegistrationComponent} from '../nurse-patient-registration/nurse-patient-registration.component';
import {PatientService} from '../../service/base/patient.service';
import {DietService} from '../../service/base/diet.service';
import {PatientData} from '../../dataBaseObjects/patient-data';
import {Page} from '../../dataBaseObjects/page';

/** Constants used to fill up our data base. */


@Component({
  selector: 'app-nurse-main',
  templateUrl: './nurse-main.component.html',
  styleUrls: ['./nurse-main.component.css']
})
export class NurseMainComponent implements OnInit {

  displayedColumns: string[] = ['id', 'pesel', 'firstName', 'lastName', 'admissionDate', 'diet'];
  bufferDataSource;
  dataSource: MatTableDataSource<PatientData>;
  users: Page<PatientData>;
  selectedDiets: string[];
  dietList: string[];
  diets = new FormControl();
  filterValue = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              private router: Router,
              private patientService: PatientService,
              private dietService: DietService
  ) {
  }


  ngOnInit(): void {
    this.patientService.getPatientsData('data-ward')
      .subscribe(patients => {
        this.users = patients;
        this.users.content.map(u => {
          if (u.diet === '') {
            u.diet = 'BRAK';
          }
        });

        this.dietService.getPage()
          .subscribe(diets => {
            this.dietList = diets.content.map(d => d.name).concat(['BRAK']);
            this.selectedDiets = this.dietList;
            this.bindData();

          });

        this.bufferDataSource = this.users.content.map(x => Object.assign({}, x));
        this.dataSource = new MatTableDataSource(this.bufferDataSource);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
      });
  }

  bindData(): void {
    const anotherListDiet: string[] = this.dietList;

    this.diets.setValue(anotherListDiet);
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    console.log(this.selectedDiets);
    console.log(this.filterValue);
    console.log(this.dataSource);

  }

  openPopup(id: string): void {
    const dialogRef = this.dialog.open(NursePatientDetailsComponent, {
      minWidth: '50%',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getNewPatients();
      }
    });
  }


  filterDiets(): void {

    this.selectedDiets = (this.diets.value && this.diets.value.toString()).split(',');
    this.predicateData();
  }

  private predicateData(): void {
    this.bufferDataSource = this.users.content.map(x => Object.assign({}, x))
      .filter(x => this.selectedDiets.includes(x.diet));
    this.dataSource = new MatTableDataSource(this.bufferDataSource);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openRegistration(): void {
    const dialogRef = this.dialog.open(NursePatientRegistrationComponent, {
      minWidth: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getNewPatients();
      }
    });
  }

  openOrders(): void {
    this.router.navigateByUrl('wardNurseOrders');
  }

  getNewPatients(): void {
    this.patientService.getPatientsData('data-ward')
      .subscribe(patients => {
        this.users = patients;
        this.users.content.map(u => {
          if (u.diet === '') {
            u.diet = 'BRAK';
          }
        });

        this.bufferDataSource = this.users.content.map(x => Object.assign({}, x));
        this.dataSource = new MatTableDataSource(this.bufferDataSource);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);

      });
  }
}

