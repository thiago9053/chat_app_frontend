import { ContactService } from "./contact.service";
import { ProfileService } from "./profile.service";
import { authService } from "@/shared/infra/services";

const profileService = new ProfileService(authService);
const contactService = new ContactService(authService);

export { profileService, contactService };
