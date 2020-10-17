import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Event} from '../../dataBaseObjects/event';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService<Event, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'events');
  }
}
