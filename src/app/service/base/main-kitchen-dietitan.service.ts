import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {MainKitchenDietitian} from '../../dataBaseObjects/main-kitchen-dietitian';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainKitchenDietitianService extends BaseService<MainKitchenDietitian, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'main-kitchen-dietitians');
  }
}
