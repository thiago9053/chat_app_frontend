import { BaseService } from "@/shared/infra/services/baseService";
import { IAuthService } from "@/shared/infra/services/authService";

export class ContactService extends BaseService {
  constructor(authService: IAuthService) {
    super(authService);
  }
}
