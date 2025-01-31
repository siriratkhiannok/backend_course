import { LoginService } from "@/services/login";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookie = await cookies();

  const session = cookie.get("session")?.value;
  const loginService = new LoginService();

  if (session) {
    const user = await loginService.getUserFromSession(session);

    return NextResponse.json({
      username: user?.username,
      fullname: user?.fullname,
    });
  }

  return NextResponse.json({ error: "Not Authorize" }, { status: 401 });
}
