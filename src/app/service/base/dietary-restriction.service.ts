import {Injectable} from '@angular/core';
import {DietaryRestriction} from '../../dataBaseObjects/dietary-restriction';
import {HttpClient} from '@angular/common/http';
import {BaseSpecificationService} from './base-specification-service';

@Injectable({
  providedIn: 'root'
})
export class DietaryRestrictionService extends BaseSpecificationService<DietaryRestriction, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'dietary-restrictions');
  }
}
