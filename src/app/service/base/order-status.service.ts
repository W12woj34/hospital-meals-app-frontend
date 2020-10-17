import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {OrderStatus} from '../../dataBaseObjects/order-status';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService extends BaseService<OrderStatus, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'order-statuses');
  }
}
