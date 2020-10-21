import {Resource} from './resource';
import {Person} from './person';

export interface Patient extends Resource<number> {
  additionalInfo: string;
  person: Person;
}
