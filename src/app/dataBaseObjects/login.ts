import {Resource} from './resource';

export interface Login extends Resource<number> {
  username: string;
  password: string;
}
