import {Diet} from './Diet';

export interface PatientDiet {
  id: number;
  startDate: string;
  endDate: string;
  patientId: number;
  diet: Diet;
}
