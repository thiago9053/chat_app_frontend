import { BaseService } from "@/shared/infra/services/baseService";
import { IAuthService } from "@/shared/infra/services/authService";

export class SettingsService extends BaseService {
  constructor(authService: IAuthService) {
    super(authService);
  }
}
