import {Resource} from './resource';

export interface PatientData extends Resource<number> {
  firstName: string;
  lastName: string;
  birthDate: string;
  pesel: number;
  ward: string;
  diet: string;
  additionalInfo: string;
}
