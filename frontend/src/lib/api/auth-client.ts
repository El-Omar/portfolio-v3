import { BaseApiClient } from "./base-client";
import { env } from "@/config/env";
import { LoginResponse } from "@portfolio-v3/shared";

export class AuthClient extends BaseApiClient {
  async login(email: string, password: string): Promise<LoginResponse> {
    const endpoint = `/${env.CMS_ADMIN_PATH}/auth/login`;
    return this.fetch<{ data: LoginResponse }>(endpoint, {
      method: "POST",
      body: { email, password },
    }).then((res) => res.data);
  }
}

export const authClient = new AuthClient();