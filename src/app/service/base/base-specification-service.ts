import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {Resource} from '../../dataBaseObjects/resource';
import {Page} from '../../dataBaseObjects/page';
import {BaseService} from './base.service';

export abstract class BaseSpecificationService<T extends Resource<ID>, ID> extends BaseService<T, ID> {

  getPageSpec(path: string,
              specificationParams: HttpParams,
              page: number = 0,
              pageSize: number = 20,
              sortFields?: string[]
  ): Observable<Page<T>> {

    let url = `${this.apiURL}/${this.endpoint}/${path}`;
    if (path === '') {
      url = url + 'search';
    } else {
      url = url + '/search';
    }


    specificationParams = specificationParams
      .set('page', page.toString())
      .set('size', pageSize.toString());

    if (sortFields) {
      for (const sortField of sortFields) {
        specificationParams = specificationParams.append('sort', sortField);
      }
    }

    return this.http.get<Page<T>>(url, {params: specificationParams}).pipe(
      tap(x => x.size ?
        console.log(`fetched ${x.content.length} dtos from ${url}?${specificationParams.toString()}`) :
        console.log(`no dtos under ${url}?${specificationParams}`)),
      catchError(this.handleError<Page<T>>('searchDtos', new Page()))
    );
  }

}
