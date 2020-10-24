import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Login} from '../../dataBaseObjects/login';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService<Login, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'logins');
  }

  isExistUsername(path: string): Observable<boolean> {
    const url = `${this.apiURL}/${this.endpoint}/exists-username/${path}`;
    return this.http.get<boolean>(url)
      .pipe(
        tap(() => console.log(`fetched get from ${url}`)),
        catchError(this.handleError<boolean>(`get from ${path}`))
      );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<boolean> {
    const url = `${this.apiURL}/${this.endpoint}/change-password/?oldPassword=${oldPassword}&newPassword=${newPassword}`;
    return this.http.put(url, null, this.httpOptions).pipe(
      tap(() => console.log(`send request to change user password ${url}`)),
      catchError(this.handleError<any>('updateDto'))
    );
  }

  changePasswordForce(newPassword: string, id: number): Observable<boolean> {
    const url = `${this.apiURL}/${this.endpoint}/change-password-force/${id.toString()}/?newPassword=${newPassword}`;
    return this.http.put(url, null, this.httpOptions).pipe(
      tap(() => console.log(`send request to force change user password ${url}`)),
      catchError(this.handleError<any>('updateDto'))
    );
  }

  signUp(dto: Login): Observable<Login> {
    const url = `${this.apiURL}/${this.endpoint}/sign-up`;
    return this.http.post(url, dto, this.httpOptions).pipe(
      tap(() => console.log(`register user under ${url}`)),
      catchError(this.handleError<any>('signUp'))
    );
  }

}
