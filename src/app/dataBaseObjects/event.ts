import {Resource} from './resource';

export interface Event extends Resource<number> {
  eventName: string;
}
