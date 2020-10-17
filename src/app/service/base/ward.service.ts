import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Ward} from '../../dataBaseObjects/ward';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WardService extends BaseService<Ward, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'wards');
  }
}
