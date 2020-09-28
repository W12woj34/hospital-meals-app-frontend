import {Event} from './Event';

export interface Log {
  id: number;
  timestamp: string;
  modifiedEntityId: number;
  userId: number;
  event: Event;
}
