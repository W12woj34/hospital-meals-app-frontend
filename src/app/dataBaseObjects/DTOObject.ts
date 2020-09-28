import { DTOSort } from './DTOSort';
import { DTOPageable } from './DTOPageable';

export interface DTOObject<DTOType> {
    content: DTOType;
    empty: boolean;
    first: boolean;
    number: number;
    numberOfElements: number;
    pageable: DTOPageable;
    size: number;
    sort: DTOSort;
    totalElements: number;
    totalPages: number;
}