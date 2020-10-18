import {Resource} from './resource';
import {Pageable} from './pageable';

export interface RestrictionStatus extends Resource<number> {
  name: string;
}
