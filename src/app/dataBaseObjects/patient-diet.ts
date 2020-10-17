import {Diet} from './diet';
import {Resource} from './resource';

export interface PatientDiet extends Resource<number> {
  startDate: string;
  endDate: string;
  patientId: number;
  diet: Diet;
}
