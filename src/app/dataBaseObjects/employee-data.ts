import {Resource} from './resource';

export interface EmployeeData extends Resource<number> {
  firstName: string;
  lastName: string;
  birthDate: string;
  pesel: number;
  role: string;
  ward: string;
}
