import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Person} from '../../dataBaseObjects/person';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends BaseService<Person, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'people');
  }
}
