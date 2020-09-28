import {Ward} from './Ward';

export interface Stay {
  id: number;
  patientId: number;
  admissionDate: string;
  releaseDate: string;
  archived: boolean;
  ward: Ward;
}
