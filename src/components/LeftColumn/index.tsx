import { useEffect, useState } from "react";

import axios from "axios";
import { NewsCard, NewsProps } from "../NewsCard";

import styles from "./index.module.scss";

export function LeftColumn({ className }: { className?: string }) {
  const [news, setNews] = useState<NewsProps[]>([]);

  const baseUrl = "https://news-back-end-sooty.vercel.app";

  async function getNews() {
    try {
      const result = await axios.get(`${baseUrl}/news`);
      setNews(result.data);
    } catch (error: any) {
      alert(error.response?.data?.message || "Ocorreu um erro desconhecido");
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className={`${className}`}>
      <div className={styles.popularNews}>
        <p>Notícias populares</p>
      </div>
      <section>
        {news.map((newsItem) => (
          <NewsCard key={newsItem._id} news={newsItem} />
        ))}
      </section>
    </div>
  );
}
