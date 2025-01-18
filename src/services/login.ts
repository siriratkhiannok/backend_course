import { PrismaClient, Role, User } from "@prisma/client";
import { ILoginService } from "./iservice";
import * as jose from "jose";
import { serialize } from "cookie";

export class LoginService implements ILoginService {
  async getCurrentRoles(session: string): Promise<Role[]> {
    const loginService = new LoginService();
    const user = await loginService.getUserFromSession(session);

    if (user) {
      const prisma = new PrismaClient();
      const currentUser = await prisma.user.findFirst({
        where: {
          id: user.id,
        },
        include: {
          roles: true,
        },
      });

      prisma.$disconnect();

      return currentUser?.roles ?? [];
    }
    return [];
  }
  async getUserFromSession(session: string): Promise<User | null> {
    const byteSecret = await jose.base64url.decode(
      process.env.JWT_SECRET as string
    );

    const { payload, protectedHeader } = await jose.jwtDecrypt(
      session,
      byteSecret
    );

    const time = new Date().getTime();
    if (payload.exp && time < payload.exp * 1000) {
      const username = payload.username ?? null;
      if (username) {
        const prisma = new PrismaClient();
        const user = await prisma.user.findFirst({
          where: {
            username: username,
          },
        });

        return user;
      }
    }

    return null;
  }

  async login(username: string, password: string): Promise<User | null> {
    try {
      const prisma = new PrismaClient();
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          username: username,
          password: password,
        },
      });

      return user;
    } catch (exception) {
      return null;
    }
  }

  async createCookie(user: User): Promise<string> {
    const byteSecret = jose.base64url.decode(process.env.JWT_SECRET as string);

    const jwt = await new jose.EncryptJWT({
      username: user.username,
      fullname: user.fullname,
    })
      .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
      .setExpirationTime("1w")
      .encrypt(byteSecret);

    const cookie = serialize("session", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return cookie;
  }
}
