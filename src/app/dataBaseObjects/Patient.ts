import {Person} from './Person';

export interface Patient extends Person {
  additionalInfo: string;
}
