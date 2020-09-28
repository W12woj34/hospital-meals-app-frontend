import { DTOSort } from './DTOSort';

export interface DTOPageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: DTOSort;
    unpaged: boolean;
}
