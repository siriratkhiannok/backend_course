import { LoginService } from "@/services/login";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookie = await cookies();
  const session = cookie.get("session")?.value;
  const loginService = new LoginService();

  if (session) {
    const roles = await loginService.getCurrentRoles(session);

    const roleResponse: any = roles.map((r: any) => {
      return {
        id: String(r.id),
        name: r.name,
      };
    });


    return NextResponse.json(roleResponse);
  }
}
