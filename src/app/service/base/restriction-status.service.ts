import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {RestrictionStatus} from '../../dataBaseObjects/restriction-status';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestrictionStatusService extends BaseService<RestrictionStatus, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'restriction-statuses');
  }
}
