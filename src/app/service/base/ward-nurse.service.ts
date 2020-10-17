import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {WardNurse} from '../../dataBaseObjects/ward-nurse';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WardNurseService extends BaseService<WardNurse, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'ward-nurses');
  }
}
