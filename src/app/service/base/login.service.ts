import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Login} from '../../dataBaseObjects/login';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {PasswordChangeForce} from '../../dataBaseObjects/password-change-force';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService<Login, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'logins');
  }

  changePassword(oldPassword: string, newPassword: string): Observable<boolean> {
    const url = `${this.apiURL}/${this.endpoint}/change-password/?oldPassword=${oldPassword}&newPassword=${newPassword}`;
    return this.http.put(url, null, this.httpOptions).pipe(
      tap(_ => console.log(`send request to change user password ${url}`)),
      catchError(this.handleError<any>('updateDto'))
    );
  }

  changePasswordForce(newPassword: string, id: number): Observable<boolean> {
    const url = `${this.apiURL}/${this.endpoint}/change-password-force/${id.toString()}/?newPassword=${newPassword}`;
    return this.http.put(url, null, this.httpOptions).pipe(
      tap(_ => console.log(`send request to force change user password ${url}`)),
      catchError(this.handleError<any>('updateDto'))
    );
  }
}
