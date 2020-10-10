import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movement-main',
  templateUrl: './movement-main.component.html',
  styleUrls: ['./movement-main.component.css']
})
export class MovementMainComponent implements OnInit {

  sheetDate;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openLogs(): void {
    this.router.navigateByUrl('patientMovementLogs');
  }

  openWorkers(): void  {
    this.router.navigateByUrl('patientMovementWorkers');
  }
}
