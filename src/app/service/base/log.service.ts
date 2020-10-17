import {Injectable} from '@angular/core';
import {Log} from '../../dataBaseObjects/log';
import {HttpClient} from '@angular/common/http';
import {BaseSpecificationService} from './base-specification-service';

@Injectable({
  providedIn: 'root'
})
export class LogService extends BaseSpecificationService<Log, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'logs');
  }
}
