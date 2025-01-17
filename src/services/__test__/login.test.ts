/** @jest-environment node */

import { LoginService } from "../login";

test("login success", async () => {
  const loginService = new LoginService();

  const adminLogin = await loginService.login("admin", "admin");

  expect(adminLogin).toHaveProperty("id", BigInt(1));
});
