import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements CanActivate {
  private apiURL = 'https://localhost:443';
  private refreshToken = '';
  private accessToken = '';
  private role = '';

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  canActivate(): boolean {
    if (this.accessToken !== '' && this.refreshToken !== '') {
      console.log(this.role);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  login(url: string, user: any): any {
    console.log(this.apiURL + url);
    return this.httpClient.post(this.apiURL + url, user, {observe: 'response'}).pipe(
      map(response => {
        this.accessToken = response.headers.get('authorization');
        this.refreshToken = response.headers.get('refresh');
        this.role = response.headers.get('UserType');
      }));
    // let dataBaseObject;
    // let x = "";
    // dataBaseObject = await this.httpClient.post(this.apiURL + url, user, {observe: 'response'}).pipe(
    //   map(response => {
    //     this.accessToken = response.headers.get("authorization");
    //     this.refreshToken = response.headers.get('refresh');
    //     this.id = response.headers.get('userId');
    //     this.role = response.headers.get('UserType');
    //     console.log(response.headers.get('UserType'));
    //     x = response.headers.get('UserType');
    //   }));
    //
    // console.log(x);
    // return dataBaseObject;
  }

  getRole(): string {
    return this.role;
  }

  async get(url: string): Promise<any> {
    console.log(this.apiURL + url);

    let dataBaseObject;
    try {
      dataBaseObject = await this.httpClient.get(this.apiURL + url, {headers: this.getHeaders()}).toPromise();
      console.log(dataBaseObject);
    } catch (e) {
      if (e.status === 401) {
        await this.refreshAccessToken();
        try {
          dataBaseObject = await this.httpClient.get(this.apiURL + url, {headers: this.getHeaders()}).toPromise();
        } catch (e) {
          if (e.status === 401) {
            this.logout();
          }
        }
      }
    }
    return dataBaseObject;
  }

  async getCv(url: string): Promise<any> {
    console.log(this.apiURL + url);

    let dataBaseObject;
    try {
      dataBaseObject = await this.httpClient.get(this.apiURL + url, {headers: this.getHeaders(), responseType: 'blob'}).toPromise();
      const blob = new Blob([dataBaseObject], {type: 'application/pdf'});
      const urlPDF = window.URL.createObjectURL(blob);
      window.open(urlPDF);
    } catch (e) {
      if (e.status === 401) {
        await this.refreshAccessToken();
        try {
          dataBaseObject = await this.httpClient.get(this.apiURL + url, {headers: this.getHeaders(), responseType: 'blob'}).toPromise();
          const blob = new Blob([dataBaseObject], {type: 'application/pdf'});
          const urlPDF = window.URL.createObjectURL(blob);
          window.open(urlPDF);
        } catch (e) {
          if (e.status === 401) {
            this.logout();
          }
        }
      }
    }
    return dataBaseObject;
  }

  async post(url: string, body: any): Promise<any> {
    console.log(this.apiURL + url);

    let dataBaseObject;
    try {
      dataBaseObject = await this.httpClient.post(this.apiURL + url, body, {headers: this.getHeaders()}).toPromise();
    } catch (e) {
      if (e.status === 401) {
        await this.refreshAccessToken();
        try {
          dataBaseObject = await this.httpClient.post(this.apiURL + url, body, {headers: this.getHeaders()}).toPromise();
        } catch (e) {
          if (e.status === 401) {
            this.logout();
          }
        }
      }
    }
    return dataBaseObject;
  }

  async put(url: string, body: any): Promise<any> {
    console.log(this.apiURL + url);

    let dataBaseObject;
    try {
      dataBaseObject = await this.httpClient.put(this.apiURL + url, body, {headers: this.getHeaders()}).toPromise();
    } catch (e) {
      if (e.status === 401) {
        await this.refreshAccessToken();
        try {
          dataBaseObject = await this.httpClient.put(this.apiURL + url, body, {headers: this.getHeaders()}).toPromise();
        } catch (e) {
          if (e.status === 401) {
            this.logout();
          }
        }
      }
    }
    return dataBaseObject;
  }

  private logout(): void {
    this.accessToken = '';
    this.refreshToken = '';
    this.role = '';
    this.router.navigateByUrl('login');
  }

  private async refreshAccessToken(): Promise<any> {
    console.log('refreshing token');
    const headers1 = new HttpHeaders({Refresh: this.refreshToken});
    await this.httpClient.post(this.apiURL + '/logins/refresh', '', {headers: headers1, observe: 'response'})
      .pipe(map(resp => {
        this.accessToken = resp.headers.get('authorization');
      })).toPromise();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({Authorization: this.accessToken});
  }
}


