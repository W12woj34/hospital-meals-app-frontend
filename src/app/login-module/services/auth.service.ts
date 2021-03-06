import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {catchError, map, mapTo, tap} from 'rxjs/operators';
import {Tokens} from '../models/tokens';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly LOGGED_USER: 'LOGGED_USER';
  private apiURL = 'https://localhost:443';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${this.apiURL}/login`, user, {observe: 'response'})
      .pipe(
        map(response => {
          console.log(response);
          this.doLoginUser(response.headers.get('Role'),
            response.headers.get('Authorization'),
            response.headers.get('Refresh'));
        }),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout(): void {
    this.doLogoutUser();
    this.router.navigateByUrl('login');
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  refreshToken(): Observable<any> {
    console.log('Token refreshed');
    return this.http.post<any>(`${this.apiURL}/logins/refresh?refreshToken=${this.getRefreshToken()}`,
      {})
      .pipe(
        tap((tokens: Tokens) => {
        this.storeJwtToken(tokens.jwt);
      })
      );
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getLoggedUser(): string {
    return localStorage.getItem(this.LOGGED_USER);
  }

  getApiUrl(): string {
    return this.apiURL;
  }

  private doLoginUser(role: string, jwt: string, refreshToken: string): void {
    localStorage.setItem(this.LOGGED_USER, role);
    this.storeTokens(new Tokens(jwt, refreshToken));
  }

  private doLogoutUser(): void {
    localStorage.removeItem(this.LOGGED_USER);
    this.removeTokens();
  }

  private getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string): void {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens): void {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

}
