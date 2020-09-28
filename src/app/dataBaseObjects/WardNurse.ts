import {Employee} from './Employee';
import {Ward} from './Ward';

export interface WardNurse extends Employee{
  id: number;
  ward: Ward;
}
