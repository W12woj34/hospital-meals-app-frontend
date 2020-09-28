import {MealType} from './MealType';
import {Diet} from './Diet';

export interface Meal {
  id: number;
  additionalInfo: string;
  option: number;
  date: string;
  type: MealType;
  diet: Diet;
}
