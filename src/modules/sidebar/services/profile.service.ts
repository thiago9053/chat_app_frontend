import { right, left } from "@/shared/core/Either";
import { Result } from "@/shared/core/Result";
import { BaseService } from "@/shared/infra/services/baseService";
import { IAuthService } from "@/shared/infra/services/authService";
import { APIResponse } from "@/shared/infra/services/APIResponse";

export type getProfileResponse = {};

export class ProfileService extends BaseService {
  constructor(authService: IAuthService) {
    super(authService);
  }

  public async getProfile(): Promise<APIResponse<any>> {
    try {
      const response = await this.get("/user/me", null, {
        authorization: this.authService.getToken("access-token").token,
      });
      const data = response.data;
      return right(Result.ok<any>(data));
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }
}
