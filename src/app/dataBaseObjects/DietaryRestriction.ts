import {RestrictionStatus} from './RestrictionStatus';

export interface DietaryRestriction {
  id: number;
  restriction: string;
  patientId: number;
  dietitianId: number;
  status: RestrictionStatus;
}
