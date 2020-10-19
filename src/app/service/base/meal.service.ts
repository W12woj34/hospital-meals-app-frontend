import {Injectable} from '@angular/core';
import {Meal} from '../../dataBaseObjects/meal';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {PatientMealOrder} from '../../dataBaseObjects/patient-meal-order';
import {BaseSpecificationService} from './base-specification-service';
import {BaseService} from './base.service';
import {Page} from '../../dataBaseObjects/page';

@Injectable({
  providedIn: 'root'
})
export class MealService extends BaseSpecificationService<Meal, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'meals');
  }

  getMealOrders(page: number = BaseService.DEFAULT_PAGE,
                pageSize: number = BaseService.DEFAULT_PAGE_SIZE,
                sortFields?: string[]
  ): Observable<Page<PatientMealOrder>> {

    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    if (sortFields) {
      httpParams = httpParams.set('sort', sortFields.toString());
    }
    const url = `${this.apiURL}/${this.endpoint}/meal-order`;
    return this.http.get<Page<PatientMealOrder>>(url, {params: httpParams})
      .pipe(
        tap(x => console.log(`fetched ${x.content.length} dtos from ${url}?${httpParams.toString()}`)),
        catchError(this.handleError<Page<PatientMealOrder>>('getPage', new Page()))
      );
  }

  setPatientMeals(dto: PatientMealOrder[], path?: string): Observable<void> {

    const url = `${this.apiURL}/${this.endpoint}/${path}`;
    console.log(url);
    console.log(dto);
    return this.http.post<void>(url, dto, this.httpOptions).pipe(
      tap(_ => console.log(`post Dtos to ${url}`)),
      catchError(this.handleError<void>('addDto'))
    );
  }
}
