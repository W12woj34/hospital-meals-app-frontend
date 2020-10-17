import {Event} from './event';
import {Resource} from './resource';

export interface Log extends Resource<number> {
  timestamp: string;
  modifiedEntityId: number;
  userId: number;
  event: Event;
}
