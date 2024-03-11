"use client";

import { RightColumn } from "@/components/RightColumn";

import { NewsCardsGrid } from "@/components/NewsCardsGrid";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./page.module.scss";

interface FeedPageProps {
  params: {
    category: string;
  };
}

export default function FeedPage({ params }: FeedPageProps) {
  const [news, setNews] = useState([]);

  const baseUrl = "https://news-back-end-sooty.vercel.app";

  async function getNews() {
    try {
      const result = await axios.get(
        `${baseUrl}/news?category=${params.category}`
      );
      setNews(result.data);
    } catch (error: any) {
      alert(error.response?.data?.message || "Ocorreu um erro desconhecido");
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <h1>{params.category.toUpperCase()}</h1>
        <NewsCardsGrid news={news} />
      </div>
      <div className={styles.rightColumn}>
        <RightColumn />
      </div>
    </div>
  );
}
