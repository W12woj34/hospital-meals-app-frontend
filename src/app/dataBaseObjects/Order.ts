import {OrderStatus} from './OrderStatus';

export interface Order {
  id: number;
  patientId: number;
  nurseId: number;
  status: OrderStatus;
  timestamp: string;
}
