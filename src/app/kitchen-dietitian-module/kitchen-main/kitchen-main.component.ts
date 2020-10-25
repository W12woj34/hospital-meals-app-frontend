import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../service/report/report.service';
import {MealDemand} from '../../dataBaseObjects/meal-demand';

@Component({
  selector: 'app-kitchen-main',
  templateUrl: './kitchen-main.component.html',
  styleUrls: ['./kitchen-main.component.css']
})
export class KitchenMainComponent implements OnInit {

  timestamp = '';
  demands: MealDemand;

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.getDemands();
  }


  getDemands(): void {

    this.reportService.getMealsNumber().subscribe(mealNumber => {
      this.demands = mealNumber;

      let times = [this.timestamp, mealNumber.lastUpdate];
      times = times.sort().reverse();
      if (this.timestamp === ''){
        this.timestamp = times[0];
      }
    });
  }


  displaySummaryReport(): void {

    this.getDemands();
    this.reportService.getSummaryReport().subscribe(report => {
      const blob = new Blob([report], {type: 'application/pdf'});
      const urlPDF = window.URL.createObjectURL(blob);
      window.open(urlPDF);
    });
  }


  displayDemandsReport(): void {

    this.getDemands();
    this.reportService.getDemandsReport().subscribe(report => {
      const blob = new Blob([report], {type: 'application/pdf'});
      const urlPDF = window.URL.createObjectURL(blob);
      window.open(urlPDF);
    });
  }

}
