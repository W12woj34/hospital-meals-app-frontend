import {Person} from './person';

export interface Patient extends Person {
  additionalInfo: string;
}
