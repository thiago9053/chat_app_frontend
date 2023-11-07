import { BaseService } from "@/shared/infra/services/baseService";
import { IAuthService } from "@/shared/infra/services/authService";
import { Result } from "@/shared/core/Result";
import { right, left } from "@/shared/core/Either";
import { APIResponse } from "@/shared/infra/services/APIResponse";

export type LoginArgs = {
  username: string;
  password: string;
};

export type loginResponse = {
  refreshToken: string;
  accessToken: string;
};

export class UserService extends BaseService {
  constructor(authService: IAuthService) {
    super(authService);
  }

  public async login(args: LoginArgs): Promise<APIResponse<loginResponse>> {
    try {
      const response = await this.post("/user/login", args);
      const data: loginResponse = response.data as loginResponse;
      this.authService.setToken("access-token", data.accessToken);
      this.authService.setToken("refresh-token", data.refreshToken);
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
        authorization: this.authService.getToken("access-token"),
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
}
