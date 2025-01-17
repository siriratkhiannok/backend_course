import { LoginService } from "@/services/login";
import { NextResponse } from "next/server";
import cookie from "cookie";

export async function POST(request: Request) {
  const data = await request.json();
  const loginService = new LoginService();
  const user = data as { username: string; password: string };

  const loginResponse = await loginService.login(user.username, user.password);

  if (loginResponse) {
    const cookie_response = await loginService.createCookie(loginResponse);
    const parse_cookie = cookie.parse(cookie_response);

    const res = NextResponse.json("Login Successfully.");

    for (const item in parse_cookie) {
      if (parse_cookie[item]) {
        res.cookies.set(item, parse_cookie[item]);
      }
    }

    return res;
  } else {
    const res = NextResponse.json("Login Unsuccessful.", { status: 400 });

    return res;
  }
}
