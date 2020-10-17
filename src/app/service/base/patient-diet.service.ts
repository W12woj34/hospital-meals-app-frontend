import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {PatientDiet} from '../../dataBaseObjects/patient-diet';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientDietService extends BaseService<PatientDiet, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'patient-diets');
  }
}
