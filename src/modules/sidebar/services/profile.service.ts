import { right, left } from "@/shared/core/Either";
import { Result } from "@/shared/core/Result";
import { BaseService } from "@/shared/infra/services/baseService";
import { IAuthService } from "@/shared/infra/services/authService";

export class ProfileService extends BaseService {
  constructor(authService: IAuthService) {
    super(authService);
  }

  public async getProfile(): Promise<any> {
    try {
      const response = await this.get("user/me", null, {
        authorization: this.authService.getToken("access-token").token,
      });
      console.log(response);
      return right(Result.ok<void>());
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }
}
