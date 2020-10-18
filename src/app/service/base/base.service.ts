import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Resource} from '../../dataBaseObjects/resource';
import {Page} from '../../dataBaseObjects/page';


export abstract class BaseService<T extends Resource<ID>, ID> {

  protected static readonly DEFAULT_PAGE = 0;
  protected static readonly DEFAULT_PAGE_SIZE = 100;
  protected apiURL = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  protected constructor(protected http: HttpClient, protected endpoint: string) {
  }


  getPage(path: string = '',
          page: number = BaseService.DEFAULT_PAGE,
          pageSize: number = BaseService.DEFAULT_PAGE_SIZE,
          sortFields?: string[]
  ): Observable<Page<T>> {

    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    if (sortFields) {
      httpParams = httpParams.set('sort', sortFields.toString());
    }
    const url = `${this.apiURL}/${this.endpoint}/${path}`;
    return this.http.get<Page<T>>(url, {params: httpParams})
      .pipe(
        tap(x => console.log(`fetched ${x.content.length} dtos from ${url}?${httpParams.toString()}`)),
        catchError(this.handleError<Page<T>>('getPage', new Page()))
      );
  }

  get(path: string): Observable<T> {
    const url = `${this.apiURL}/${this.endpoint}/${path}`;
    return this.http.get<T>(url)
      .pipe(
        tap(_ => console.log(`fetched get from ${url}`)),
        catchError(this.handleError<T>(`get from ${path}`))
      );
  }

  put(dto: T, path?: string): Observable<T> {
    const url = `${this.apiURL}/${this.endpoint}/${path}`;
    return this.http.put(url, dto, this.httpOptions).pipe(
      tap(_ => console.log(`put Dto to ${url}`)),
      catchError(this.handleError<any>('updateDto'))
    );
  }

  post(dto: T, path?: string): Observable<T> {
    const url = `${this.apiURL}/${this.endpoint}/${path}`;
    return this.http.post<T>(url, dto, this.httpOptions).pipe(
      tap((newDto: T) => console.log(`post Dto to ${url}, with id ${newDto.id}`)),
      catchError(this.handleError<T>('addDto'))
    );
  }

  delete(path: string): Observable<HttpResponse<any>> {
    const url = `${this.apiURL}/${this.endpoint}/${path}`;

    return this.http.delete<any>(url, {headers: this.httpOptions.headers, observe: 'response'}).pipe(
      tap(_ => console.log(`deleted Dto from ${url}`))
    );
  }

  protected handleError<U>(operation = 'operation', result?: U): (error: any) => Observable<U> {
    return (error: any): Observable<U> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as U);
    };
  }

}
