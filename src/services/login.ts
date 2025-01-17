import { PrismaClient, User } from "@prisma/client";
import { ILoginService } from "./iservice";

export class LoginService implements ILoginService {
  async login(username: string, password: string): Promise<User | null> {
    try {
      const prisma = new PrismaClient();
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          username: username,
        },
      });

      return user;
    } catch (exception) {
      console.log(exception);
      return null;
    }
  }
}
