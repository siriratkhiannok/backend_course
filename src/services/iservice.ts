import { Role, User } from "@prisma/client";

export interface ISimpleService {
  ok(): string;
}

export interface ILoginService {
  login(username: string, password: string): Promise<User | null>;
  createCookie(user: User): Promise<string>;
  getUserFromSession(session: string): Promise<User | null>;
  getCurrentRoles(session: string): Promise<Role[]>
}

export interface IAuthorizationService {
  getRolesByUserId(id: number): Role[];
  hadRole(userId: number, role: string): boolean;
}
