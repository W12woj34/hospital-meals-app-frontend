import {Ward} from './ward';
import {Resource} from './resource';

export interface Stay extends Resource<number> {
  patientId: number;
  admissionDate: string;
  releaseDate: string;
  archived: boolean;
  ward: Ward;
}
