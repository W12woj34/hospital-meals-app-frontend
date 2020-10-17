import {Resource} from './resource';

export interface OrderStatus extends Resource<number> {
  name: string;
}
