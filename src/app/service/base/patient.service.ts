import {Injectable} from '@angular/core';
import {PatientData} from '../../dataBaseObjects/patient-data';
import {Patient} from '../../dataBaseObjects/patient';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {BaseSpecificationService} from './base-specification-service';
import {BaseService} from './base.service';
import {Page} from '../../dataBaseObjects/page';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseSpecificationService<Patient, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'patients');
  }

  getPatientsData(page: number = BaseService.DEFAULT_PAGE,
                  pageSize: number = BaseService.DEFAULT_PAGE_SIZE,
                  path: string,
                  sortFields?: string[]
  ): Observable<Page<PatientData>> {

    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    if (sortFields) {
      httpParams = httpParams.set('sort', sortFields.toString());
    }
    const url = `${this.apiURL}/${this.endpoint}/${path}`;
    return this.http.get<Page<PatientData>>(url, {params: httpParams})
      .pipe(
        tap(x => console.log(`fetched ${x.content.length} dtos from ${url}?${httpParams.toString()}`)),
        catchError(this.handleError<Page<PatientData>>('getPage', new Page()))
      );
  }


  getPatientData(path: string): Observable<PatientData> {
    const url = `${this.apiURL}/${this.endpoint}/${path}`;
    return this.http.get<PatientData>(url).pipe(
      tap(_ => console.log(`fetched get from ${url}`)),
      catchError(this.handleError<PatientData>(`get from ${path}`))
    );
  }

}
