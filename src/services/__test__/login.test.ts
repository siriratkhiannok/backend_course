/** @jest-environment node */

import { LoginService } from "../login";

test("login admin success", async () => {
  const loginService = new LoginService();

  const adminLogin = await loginService.login("admin", "admin");

  expect(adminLogin).toHaveProperty("id", BigInt(1));
});

test("login user success", async () => {
  const loginService = new LoginService();

  const userLogin = await loginService.login("user", "user");

  expect(userLogin).toHaveProperty("id", BigInt(2));
});

test("login failed", async () => {
  const loginService = new LoginService();

  const failedLogin = await loginService.login("admin", "user");

  expect(failedLogin).toBeNull();
});
