import { NewsCard } from "../NewsCard";
import styles from "./index.module.scss";

export interface NewsProps {
  _id: string;
  title: string;
  image: string;
  text: string;
  createdAt: string;
}

export function NewsCardsGrid({ news }: { news: NewsProps[] }) {
  return (
    <div className={styles.container}>
      {news.length === 0 ? (
        <p className={styles.noNewsText}>
          Não existem notícias registradas para essa categoria.
        </p>
      ) : (
        news.map((item) => <NewsCard key={item._id} news={item} />)
      )}
    </div>
  );
}
