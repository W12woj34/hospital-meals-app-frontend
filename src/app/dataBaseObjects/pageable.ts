import {Sort} from './sort';

export class Pageable {
  static readonly DEFAULT_PAGE_SIZE = 100;
  static readonly FIRST_PAGE_NUMBER = 0;
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;

  public constructor() {
    this.pageSize = Pageable.DEFAULT_PAGE_SIZE;
    this.pageNumber = Pageable.FIRST_PAGE_NUMBER;
  }

}
