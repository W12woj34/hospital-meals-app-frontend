import {Injectable} from '@angular/core';
import {Stay} from '../../dataBaseObjects/stay';
import {HttpClient} from '@angular/common/http';
import {BaseSpecificationService} from './base-specification-service';

@Injectable({
  providedIn: 'root'
})
export class StayService extends BaseSpecificationService<Stay, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'stays');
  }
}
