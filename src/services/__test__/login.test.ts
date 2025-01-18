/** @jest-environment node */

import { User } from "@prisma/client";
import { LoginService } from "../login";
import { parse } from "cookie";

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

test("create cookie", async () => {
  const loginService = new LoginService();
  const adminLogin = await loginService.login("admin", "admin");
  const cookie = await loginService.createCookie(adminLogin as User);

  if (adminLogin) {
    expect(cookie).not.toBeNull();
  } else {
    expect(adminLogin).toBeNull();
  }
});

test("get role admin", async () => {
  const loginService = new LoginService();
  const adminLogin = await loginService.login("admin", "admin");

  if (adminLogin) {
    const cookie = await loginService.createCookie(adminLogin);
    expect(cookie).not.toBeNull();
    const session = parse(cookie);
    expect(session).not.toBeUndefined();
    expect(session.session).not.toBeNull();
    if (session != undefined && session.session) {
      const roles = await loginService.getCurrentRoles(session.session);
      expect(roles).not.toBeNull();
      expect(roles.length).toBeGreaterThan(0);
    } else {
      expect(adminLogin).toBeNull();
    }
  }
});
