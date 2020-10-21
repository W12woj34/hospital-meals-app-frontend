import {Resource} from './resource';
import {Person} from './person';

export interface Employee extends Resource<number>  {
  loginId: number;
  person: Person;
}
