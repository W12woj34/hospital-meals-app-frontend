import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ReportService} from '../../service/report/report.service';

@Component({
  selector: 'app-movement-main',
  templateUrl: './movement-main.component.html',
  styleUrls: ['./movement-main.component.css']
})
export class MovementMainComponent implements OnInit {

  sheetDate: Date = new Date();

  constructor(private router: Router,
              private datePipe: DatePipe,
              private reportService: ReportService) {
  }

  ngOnInit(): void {
  }

  openLogs(): void {
    this.router.navigateByUrl('patientMovementLogs');
  }

  openWorkers(): void {
    this.router.navigateByUrl('patientMovementWorkers');
  }

  displayControlReport(): void {

    const date = this.datePipe.transform(this.sheetDate, 'yyyy-MM-dd');
    this.reportService.getControlReport(date).subscribe(report => {
      const blob = new Blob([report], {type: 'application/pdf'});
      const urlPDF = window.URL.createObjectURL(blob);
      window.open(urlPDF);
    });
  }

}
