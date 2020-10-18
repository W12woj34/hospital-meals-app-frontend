import {Injectable} from '@angular/core';
import {PatientDiet} from '../../dataBaseObjects/patient-diet';
import {HttpClient} from '@angular/common/http';
import {BaseSpecificationService} from './base-specification-service';

@Injectable({
  providedIn: 'root'
})
export class PatientDietService extends BaseSpecificationService<PatientDiet, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'patients-diets');
  }
}
