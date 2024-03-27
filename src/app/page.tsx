"use client";

import styles from "./page.module.scss";

import { NewsSection } from "@/components/News";
import { LeftColumn } from "@/components/LeftColumn";
import { RightColumn } from "@/components/RightColumn";

import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = "https://news-back-end-sooty.vercel.app";

  async function getNews() {
    try {
      const result = await axios.get(`${baseUrl}/news`);
      setNews(result.data);
      setLoading(false);
    } catch (error: any) {
      alert(error.response?.data?.message || "Ocorreu um erro desconhecido");
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div>
      {loading ? (
        <div className={styles.loading}>
          <img
            src="https://media.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif"
            alt="carregando"
          />
          <h3>Carregando notícias...</h3>
        </div>
      ) : (
        <div className={styles.container}>
          <LeftColumn className={styles.leftColumn} />
          <NewsSection news={news} />
          <RightColumn className={styles.rightColumn} />
        </div>
      )}
    </div>
  );
}
