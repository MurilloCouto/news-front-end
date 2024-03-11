"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import styles from "./index.module.scss";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    switch (name) {
      case "nome":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("enviado", name, email, password);

    const baseUrl = "https://news-back-end-sooty.vercel.app";

    try {
      const form = {
        name,
        email,
        password,
      };
      const result = await axios.post(`${baseUrl}/user`, form);
      alert(result.data.message);

      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert("Erro desconhecido ao enviar a solicitação");
      }
    }

    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Cadastro</h1>
      <div className={styles.container}>
        <div>
          <label htmlFor="nome">Nome: </label>
          <input type="text" name="nome" value={name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Senha: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
}
