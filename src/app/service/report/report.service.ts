import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MealDemand} from '../../dataBaseObjects/meal-demand';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiURL = 'https://localhost:443';

  constructor(protected http: HttpClient) {
  }

  getMealsNumber(): Observable<MealDemand> {
    const url = `${this.apiURL}/reports/meals`;
    return this.http.get<MealDemand>(url)
      .pipe(
        tap(() => console.log(`fetched get from ${url}`)),
        catchError(this.handleError<MealDemand>(`get from ${url}`))
      );
  }

  getControlReport(date: string): Observable<Blob> {

    const url = `${this.apiURL}/reports/control`;
    const httpParams = new HttpParams().set('date', date);

    return this.http.get(url, {params: httpParams, responseType: 'blob'})
      .pipe(
        tap(() => console.log(`fetched report from ${url}`)),
        catchError(this.handleError<Blob>(`report from ${url}`))
      );
  }

  getSummaryReport(): Observable<Blob> {

    const url = `${this.apiURL}/reports/summary`;

    return this.http.get(url, {responseType: 'blob'})
      .pipe(
        tap(() => console.log(`fetched report from ${url}`)),
        catchError(this.handleError<Blob>(`report from ${url}`))
      );
  }

  getDemandsReport(): Observable<Blob> {

    const url = `${this.apiURL}/reports/demands`;

    return this.http.get(url, {responseType: 'blob'})
      .pipe(
        tap(() => console.log(`fetched report from ${url}`)),
        catchError(this.handleError<Blob>(`report from ${url}`))
      );
  }

  private handleError<U>(operation = 'operation', result?: U): (error: any) => Observable<U> {
    return (error: any): Observable<U> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as U);
    };
  }

}


/*
          const blob = new Blob([report], {type: 'application/pdf'});
          const urlPDF = window.URL.createObjectURL(blob);
          window.open(urlPDF);
 */
