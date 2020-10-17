import {RestrictionStatus} from './restriction-status';
import {Resource} from './resource';

export interface DietaryRestriction extends Resource<number> {
  restriction: string;
  patientId: number;
  dietitianId: number;
  status: RestrictionStatus;
}
