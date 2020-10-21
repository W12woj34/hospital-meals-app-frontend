import {OrderStatus} from './order-status';
import {Resource} from './resource';

export interface Order extends Resource<number> {
  patientId: number;
  status: OrderStatus;
  timestamp: string;
}
