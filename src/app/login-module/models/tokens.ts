export class Tokens {
  jwt: string;
  refreshToken: string;

  public constructor(jwt: string, refreshToken: string) {
    this.jwt = jwt;
    this.refreshToken = refreshToken;
  }
}
