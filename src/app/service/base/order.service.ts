import {Injectable} from '@angular/core';
import {Order} from '../../dataBaseObjects/order';
import {HttpClient} from '@angular/common/http';
import {BaseSpecificationService} from './base-specification-service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseSpecificationService<Order, number> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'orders');
  }
}
