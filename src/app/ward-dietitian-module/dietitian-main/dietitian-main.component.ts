import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DietitianPatientDetailsComponent} from '../dietitian-patient-details/dietitian-patient-details.component';
import {PatientService} from '../../service/base/patient.service';
import {PatientData} from '../../dataBaseObjects/patient-data';
import {Page} from '../../dataBaseObjects/page';
import {WardService} from '../../service/base/ward.service';
import {DietService} from '../../service/base/diet.service';

@Component({
  selector: 'app-dietitian-main',
  templateUrl: './dietitian-main.component.html',
  styleUrls: ['./dietitian-main.component.css']
})
export class DietitianMainComponent implements OnInit {

  displayedColumns: string[] = ['pesel', 'firstName', 'lastName', 'ward', 'diet'];
  bufferDataSource;
  dataSource: MatTableDataSource<PatientData>;
  users: Page<PatientData>;
  selectedWards: string[];
  selectedDiets: string[];
  dietList: string[];
  wardList: string[];
  diets = new FormControl();
  wards = new FormControl();
  filterValue = '';
  dialogResult;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              private patientService: PatientService,
              private wardService: WardService,
              private dietService: DietService) {

  }


  ngOnInit(): void {
    this.patientService.getPatientsData('data')
      .subscribe(patients => {
        this.users = patients;
        this.users.content.map(u => {
          if (u.diet === '') {
            u.diet = 'BRAK';
          }
        });

        this.wardService.getPage()
          .subscribe(wards => {
            this.wardList = wards.content.map(w => w.name);
            this.selectedWards = this.wardList;

            this.dietService.getPage()
              .subscribe(diets => {
                this.dietList = diets.content.map(d => d.name).concat(['BRAK']);
                this.selectedDiets = this.dietList;
                this.bindData();
              });
          });

        this.bufferDataSource = this.users.content.map(x => Object.assign({}, x));
        this.dataSource = new MatTableDataSource(this.bufferDataSource);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
      });

  }

  bindData(): void {
    const anotherListDiet: string[] = this.dietList;

    const anotherListWard: string[] = this.wardList;

    this.wards.setValue(anotherListWard);
    this.diets.setValue(anotherListDiet);
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    console.log(this.selectedWards);
    console.log(this.selectedDiets);
    console.log(this.filterValue);
    console.log(this.dataSource);

  }

  openPopup(id: string): void {
    const dialogRef = this.dialog.open(DietitianPatientDetailsComponent, {
      minWidth: '50%',
      data: {id, result: this.dialogResult}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      console.log('The dialog was closed');
      console.log(this.dialogResult);
    });
  }


  filterDiets(): void {

    this.selectedDiets = (this.diets.value && this.diets.value.toString()).split(',');
    this.predicateData();
  }

  filterWards(): void {

    this.selectedWards = (this.wards.value && this.wards.value.toString()).split(',');
    this.predicateData();
  }

  private predicateData(): void {
    this.bufferDataSource = this.users.content.map(x => Object.assign({}, x))
      .filter(x => this.selectedDiets.includes(x.diet))
      .filter(x => this.selectedWards.includes(x.ward));
    this.dataSource = new MatTableDataSource(this.bufferDataSource);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

