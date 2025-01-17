import { Role, User } from "@prisma/client";

export interface ISimpleService {
  ok(): string;
}

export interface ILoginService {
  login(username: string, password: string): Promise<User | null>;
}

export interface IAuthorizationService {
  getRolesByUserId(id: number): Role[];
  hadRole(userId: number, role: string): boolean;
}
