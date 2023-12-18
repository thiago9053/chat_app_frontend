import { right, left } from "@/shared/core/Either";
import { Result } from "@/shared/core/Result";
import { BaseService } from "@/shared/infra/services/baseService";
import { IAuthService } from "@/shared/infra/services/authService";
import { APIResponse } from "@/shared/infra/services/APIResponse";

export type getProfileResponse = {};

export type updateProfileArgs = {
  field: string;
  data: any;
};

export type findProfileArgs = {
  keyword: string;
};

export type findProfile = {
  email?: string;
  name?: string;
  avatarUrl?: string;
  userId: string;
  profileId: string;
};

export type findProfileResponse = {
  foundProfiles: findProfile[];
};

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

  public async updateProfile(
    args: updateProfileArgs
  ): Promise<APIResponse<void>> {
    try {
      await this.post("/profile/update", args, null, {
        authorization: this.authService.getToken("access-token").token,
      });
      return right(Result.ok<void>());
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }

  public async findProfile(
    args: findProfileArgs
  ): Promise<APIResponse<findProfileResponse>> {
    try {
      const response = await this.get("/profile/list", args);
      return right(Result.ok<findProfileResponse>(response.data));
    } catch (err: any) {
      return left(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }
}
