import { Role } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

export default async function AdminGuard({ children }: PropsWithChildren) {
  const myCookie = await cookies();
  const me = await fetch("http://localhost:3000/api/auth/me", {
    headers: { Cookie: myCookie.toString() },
  });

  if (!me.ok) {
    redirect("/auth/login");
  }

  let roles = await fetch("http://localhost:3000/api/auth/me/roles", {
    headers: { Cookie: myCookie.toString() },
  });

  if (roles.ok) {
    const userRoles = (await roles.json()) as Role[];

    let isAdmin = userRoles.map((r) => r.name).includes("admin");

    if (!isAdmin) {
      redirect("/auth/login");
    }
  } else {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
