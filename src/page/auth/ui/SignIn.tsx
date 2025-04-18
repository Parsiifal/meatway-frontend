"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function SignIn() {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res?.ok) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/dashboard"; // или другой защищённый маршрут
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="email" name="email" required/>
      </label>
      <label>
        Password
        <input type="password" name="password" required/>
      </label>
      <button type="submit">Sign In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
