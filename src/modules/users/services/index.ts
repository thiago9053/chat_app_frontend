import { UserService } from "./users.service";
import { authService } from "@/shared/infra/services";

const userService = new UserService(authService);

export { userService };
