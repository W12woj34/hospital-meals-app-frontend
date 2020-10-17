import {Employee} from './employee';
import {Ward} from './ward';

export interface WardNurse extends Employee{
  ward: Ward;
}
