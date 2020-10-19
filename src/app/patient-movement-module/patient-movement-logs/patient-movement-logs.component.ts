import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {LogService} from '../../service/base/log.service';
import {EventService} from '../../service/base/event.service';
import {PersonService} from '../../service/base/person.service';
import {Log} from '../../dataBaseObjects/log';
import {Page} from '../../dataBaseObjects/page';

export interface UserData {
  idLog: string;
  timestamp: string;
  user: string;
  log: string;
}

@Component({
  selector: 'app-patient-movement-logs',
  templateUrl: './patient-movement-logs.component.html',
  styleUrls: ['./patient-movement-logs.component.css']
})
export class PatientMovementLogsComponent implements OnInit {


  displayedColumns: string[] = ['idLog', 'timestamp', 'user', 'log'];
  bufferDataSource;
  dataSource: MatTableDataSource<UserData>;
  logsPage: Page<Log>;
  users: UserData[] = [];
  selectedLogs: string[];
  logList: string[];
  logs = new FormControl();
  filterValue = '';
  dialogResult;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              private location: Location,
              private logService: LogService,
              private eventService: EventService,
              private personService: PersonService) {
  }


  ngOnInit(): void {

    this.logService.getPage()
      .subscribe(logs => {
        this.logsPage = logs;
        this.logsPage.content.map(u => {
            this.personService.get(u.userId.toString())
              .subscribe(p => {
                this.users.push(
                  createNewUser(u.id, u.timestamp, p.firstName + ' ' + p.lastName + ' - ' + p.pesel, u.event.eventName));
              });
          }
        );

        this.eventService.getPage()
          .subscribe(events => {
            this.logList = events.content.map(e => e.eventName);
            this.selectedLogs = this.logList;
            this.bindData();
            this.users.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
            this.bufferDataSource = this.users.map(x => Object.assign({}, x));
            this.dataSource = new MatTableDataSource(this.bufferDataSource);
            setTimeout(() => this.dataSource.paginator = this.paginator);
            setTimeout(() => this.dataSource.sort = this.sort);
            console.log(this.users);
          });


      });

  }

  bindData(): void {

    const anotherListType: string[] = this.logList;
    this.logs.setValue(anotherListType);
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }


  }


  filterLogs($event: boolean): void {
    this.selectedLogs = (this.logs.value && this.logs.value.toString()).split(',');
    this.predicateData();
  }

  private predicateData(): void {

    this.bufferDataSource = this.users.map(x => Object.assign({}, x))
      .filter(x => this.selectedLogs.includes(x.log));
    this.dataSource = new MatTableDataSource(this.bufferDataSource);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  goBack(): void {
    this.location.back();
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number,
                       timestamp: string,
                       user: string,
                       log: string): UserData {

  return {
    idLog: id.toString(),
    timestamp,
    user,
    log
  };
}
