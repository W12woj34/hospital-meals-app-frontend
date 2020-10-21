import {Injectable} from '@angular/core';
import {Person} from '../../dataBaseObjects/person';
import {HttpClient} from '@angular/common/http';
import {BaseSpecificationService} from './base-specification-service';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends BaseSpecificationService<Person, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'people');
  }
}
