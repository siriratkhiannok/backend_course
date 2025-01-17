"use client";

import { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });

  const updateForm = (e: any, key: any) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const login = async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        ...form,
      }),
    });

    console.log(response);
  };
  return (
    <>
      <div>
        Username :{" "}
        <input
          type="text"
          onChange={(e) => {
            updateForm(e, "username");
          }}
        />
        <br />
        Password :{" "}
        <input
          type="password"
          name=""
          onChange={(e) => {
            updateForm(e, "password");
          }}
          id=""
        />
      </div>
        <button onClick={login}>Login</button>
    </>
  );
}
