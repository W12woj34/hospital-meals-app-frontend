import {Person} from './person';

export interface Employee extends Person {
  loginId: number;
}
