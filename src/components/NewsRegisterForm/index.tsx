"use client";

import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import styles from "./index.module.scss";

export function NewsRegisterForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "image") {
      setImage(value);
    }
    if (name === "text") {
      setText(value);
    }
    if (name === "category") {
      setCategory(value);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const baseUrl = "https://news-back-end-sooty.vercel.app";

    try {
      const form = {
        title,
        image,
        text,
        category,
      };
      await axios.post(`${baseUrl}/news`, form);
      alert("Nova notícia registrada.");
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert("Erro desconhecido ao enviar a solicitação");
      }
    }

    setTitle("");
    setImage("");
    setText("");
    setCategory("");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Cadastro de notícias</h1>
      <div className={styles.container}>
        <div>
          <label htmlFor="title">Título: </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Imagem: </label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="text">Texto: </label>
          <textarea name="text" value={text} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="category">Categoria: </label>
          <select name="category" value={category} onChange={handleChange}>
            <option>Escolha uma categoria...</option>
            <option value="produto">Produto</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="internacional">Internacional</option>
            <option value="esportes">Esportes</option>
          </select>
        </div>
        <button type="submit">Criar notícia</button>
      </div>
    </form>
  );
}
