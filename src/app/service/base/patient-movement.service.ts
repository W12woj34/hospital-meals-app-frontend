import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {PatientMovement} from '../../dataBaseObjects/patient-movement';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientMovementService extends BaseService<PatientMovement, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'patient-movements');
  }
}
