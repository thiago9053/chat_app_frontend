import { BaseService } from "@/shared/infra/services/baseService";
import { IAuthService } from "@/shared/infra/services/authService";
import { APIResponse } from "@/shared/infra/services/APIResponse";
import { left, right } from "@/shared/core/Either";
import { Result } from "@/shared/core/Result";

export type sendRequestContactArgs = {
  requesting: string;
  message: string;
};

export class ContactService extends BaseService {
  constructor(authService: IAuthService) {
    super(authService);
  }

  public async sendRequestContact(
    args: sendRequestContactArgs
  ): Promise<APIResponse<void>> {
    try {
      await this.post("/request/create", args, null, {
        authorization: this.authService.getToken("access-token").token,
      });
      return right(Result.ok<any>());
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }
}
