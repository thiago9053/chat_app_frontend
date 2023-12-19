import { BaseService } from "@/shared/infra/services/baseService";
import { IAuthService } from "@/shared/infra/services/authService";
import { APIResponse } from "@/shared/infra/services/APIResponse";
import { left, right } from "@/shared/core/Either";
import { Result } from "@/shared/core/Result";

export type sendRequestContactArgs = {
  requesting: string;
  message: string;
};

export type handleApplicationArgs = {
  requestId: string;
  status: string;
};

export type getApplicationsResponse = {
  requestItems: {
    avatarUrl: string;
    name: string;
    createdAt: Date;
    email: string;
    message: string;
    requestId: string;
  }[];
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

  public async getApplications(): Promise<
    APIResponse<getApplicationsResponse>
  > {
    try {
      const response = await this.get("/profile/contacts/list-requests", null, {
        authorization: this.authService.getToken("access-token").token,
      });
      return right(Result.ok<getApplicationsResponse>(response.data));
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }

  public async handleApplication(
    args: handleApplicationArgs
  ): Promise<APIResponse<void>> {
    try {
      await this.post("/request/update", args, null, {
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
