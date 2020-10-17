import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {MealType} from '../../dataBaseObjects/meal-type';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealTypeService extends BaseService<MealType, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'meal-types');
  }
}
