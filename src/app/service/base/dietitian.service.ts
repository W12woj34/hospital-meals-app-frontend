import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Dietitian} from '../../dataBaseObjects/dietitian';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DietitianService extends BaseService<Dietitian, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'dietitians');
  }
}
