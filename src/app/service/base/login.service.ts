import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Login} from '../../dataBaseObjects/login';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService<Login, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'logins');
  }
}
