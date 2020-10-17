import {Resource} from './resource';

export interface Person extends Resource<number> {
  firstName: string;
  lastName: string;
  birthDate: string;
  pesel: number;
}
