import {MealType} from './meal-type';
import {Diet} from './diet';
import {Resource} from './resource';

export interface Meal extends Resource<number> {
  additionalInfo: string;
  option: number;
  date: string;
  type: MealType;
  diet: Diet;
}
