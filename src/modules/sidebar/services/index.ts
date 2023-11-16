import { ProfileService } from "./profile.service";
import { authService } from "@/shared/infra/services";

const profileService = new ProfileService(authService);

export { profileService };
