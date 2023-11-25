import moment from "moment";

type TokenType = "access-token" | "refresh-token";

export type TokenPattern = {
  token: string;
  expires: Date;
};
export interface IAuthService {
  isAuthenticated(): boolean;
  getToken(tokenType: TokenType): TokenPattern;
  setToken(tokenType: TokenType, token: string, time?: number): void;
  removeToken(tokenType: TokenType): void;
}

export class AuthService implements IAuthService {
  public static accessTokenName: string = "access-token";
  public static refreshTokenName: string = "refresh-token";

  public accessToken: string;
  public refreshToken: string;

  constructor() {
    this.accessToken = this.getToken("access-token").token;
    this.refreshToken = this.getToken("refresh-token").token;
  }

  private getTokenName(tokenType: TokenType): string {
    return tokenType === "access-token"
      ? AuthService.accessTokenName
      : AuthService.refreshTokenName;
  }

  public getToken(tokenType: TokenType): TokenPattern {
    const tokenName: string = this.getTokenName(tokenType);

    const tokenPattern =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem(tokenName)
        : "";
    return {
      token: tokenPattern ? JSON.parse(tokenPattern).token : null,
      expires: tokenPattern ? JSON.parse(tokenPattern).expires : null,
    };
  }

  public setToken(tokenType: TokenType, token: string, time?: number): void {
    var d = new Date();
    d.setTime(d.getTime() + (time ?? 60) * 60 * 1000);

    const tokenName: string = this.getTokenName(tokenType);
    const tokenPattern: TokenPattern = {
      token: token,
      expires: d,
    };
    localStorage.setItem(tokenName, JSON.stringify(tokenPattern));
  }

  public removeToken(tokenType: TokenType): void {
    console.log("remove token");
    const tokenName: string = this.getTokenName(tokenType);
    localStorage.removeItem(tokenName);
  }

  isAuthenticated(): boolean {
    const tokenPattern = this.getToken("access-token");
    const { token, expires } = tokenPattern;
    return token !== null && moment(expires) > moment();
  }
}
