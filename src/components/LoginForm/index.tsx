"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../app/AuthContext";
import { ChangeEvent, useState } from "react";

import styles from "./index.module.scss";

export function LoginForm() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  const baseUrl = "https://news-back-end-sooty.vercel.app";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = await axios.post(`${baseUrl}/login`, form);
      alert(result.data.message);

      setIsAuthenticated(true);

      router.push("/admin/new/create");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert("Erro desconhecido ao enviar a solicitação");
      }
    }

    console.log("enviado", form);

    setForm({ email: "", password: "" });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Login</h1>
      <div className={styles.container}>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Senha: </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}
