import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Employee} from '../../dataBaseObjects/employee';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {EmployeeData} from '../../dataBaseObjects/employee-data';
import {Page} from '../../dataBaseObjects/page';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService<Employee, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'employees');
  }

  getEmployeesData(path: string = 'data',
                   page: number = BaseService.DEFAULT_PAGE,
                   pageSize: number = BaseService.DEFAULT_PAGE_SIZE,
                   sortFields?: string[]
  ): Observable<Page<EmployeeData>> {

    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    if (sortFields) {
      httpParams = httpParams.set('sort', sortFields.toString());
    }
    const url = `${this.apiURL}/${this.endpoint}/${path}`;
    return this.http.get<Page<EmployeeData>>(url, {params: httpParams})
      .pipe(
        tap(x => console.log(`fetched ${x.content.length} dtos from ${url}?${httpParams.toString()}`)),
        catchError(this.handleError<Page<EmployeeData>>('getPage', new Page()))
      );
  }

  getEmployeeData(path: string): Observable<EmployeeData> {
    const url = `${this.apiURL}/${this.endpoint}/${path}`;
    return this.http.get<EmployeeData>(url).pipe(
      tap(_ => console.log(`fetched get from ${url}`)),
      catchError(this.handleError<EmployeeData>(`get from ${path}`))
    );
  }

}
