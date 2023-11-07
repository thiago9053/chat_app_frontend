type TokenType = "access-token" | "refresh-token";

export interface IAuthService {
  isAuthenticated(): boolean;
  getToken(tokenType: TokenType): string;
  setToken(tokenType: TokenType, token: string): void;
  removeToken(tokenType: TokenType): void;
}

export class AuthService {
  public static accessTokenName: string = "access-token";
  public static refreshTokenName: string = "refresh-token";

  public accessToken: string;
  public refreshToken: string;

  constructor() {
    this.accessToken = this.getToken("access-token");
    this.refreshToken = this.getToken("refresh-token");
  }

  private getTokenName(tokenType: TokenType): string {
    return tokenType === "access-token"
      ? AuthService.accessTokenName
      : AuthService.refreshTokenName;
  }

  public getToken(tokenType: TokenType): string {
    const tokenName: string = this.getTokenName(tokenType);

    const token =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem(tokenName)
        : "";
    return token ? JSON.parse(token).token : null;
  }

  public setToken(tokenType: TokenType, token: string): void {
    var d = new Date();
    d.setTime(d.getTime() + 30 * 60 * 1000); // set cookie to last 30 mins

    const tokenName: string = this.getTokenName(tokenType);

    localStorage.setItem(
      tokenName,
      JSON.stringify({
        token: token,
        expires: d,
      })
    );
  }

  public removeToken(tokenType: TokenType): void {
    const tokenName: string = this.getTokenName(tokenType);
    localStorage.removeItem(tokenName);
  }

  isAuthenticated(): boolean {
    return this.getToken("access-token") !== null;
  }
}
