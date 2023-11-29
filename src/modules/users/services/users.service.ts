import { BaseService } from "@/shared/infra/services/baseService";
import { IAuthService } from "@/shared/infra/services/authService";
import { Result } from "@/shared/core/Result";
import { right, left } from "@/shared/core/Either";
import { APIResponse } from "@/shared/infra/services/APIResponse";

export type loginArgs = {
  username: string;
  password: string;
};

export type loginResponse = {
  refreshToken: string;
  accessToken: string;
};

export type signupArgs = {
  username: string;
  password: string;
  email: string;
};

export class UserService extends BaseService {
  constructor(authService: IAuthService) {
    super(authService);
  }

  public async login(args: loginArgs): Promise<APIResponse<loginResponse>> {
    try {
      const response = await this.post("/user/login", args);
      const data: loginResponse = response.data as loginResponse;
      this.authService.setToken("access-token", data.accessToken);
      this.authService.setToken(
        "refresh-token",
        data.refreshToken,
        7 * 24 * 60
      );
      return right(Result.ok<loginResponse>(data));
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }

  public async logout(): Promise<APIResponse<void>> {
    try {
      await this.post("/user/logout", null, null, {
        authorization: this.authService.getToken("access-token").token,
      });
      this.authService.removeToken("access-token");
      this.authService.removeToken("refresh-token");
      return right(Result.ok<void>());
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }

  public async signup(args: signupArgs): Promise<APIResponse<void>> {
    try {
      await this.post("/user/create", args);
      return right(Result.ok<void>());
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }
}
