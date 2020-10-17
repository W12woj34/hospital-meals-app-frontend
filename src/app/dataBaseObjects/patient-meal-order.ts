import {Resource} from './resource';

export interface PatientMealOrder extends Resource<number> {
  firstName: string;
  lastName: string;
  birthDate: string;
  pesel: number;
  ward: string;
  breakfast: boolean;
  lunch: boolean;
  supper: boolean;
}
