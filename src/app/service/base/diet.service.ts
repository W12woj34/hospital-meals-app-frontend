import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Diet} from '../../dataBaseObjects/diet';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DietService extends BaseService<Diet, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'diets');
  }
}
