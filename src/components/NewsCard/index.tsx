import styles from "./index.module.scss";
import { format } from "date-fns";

export interface NewsProps {
  _id: string;
  title: string;
  image: string;
  text: string;
  createdAt: string;
}

export function NewsCard({ news }: { news: NewsProps }) {
  const created = new Date(news.createdAt);

  const formated = format(created, "dd/MM/yyyy 'às' HH'h'mm'min'");

  const maxCaracteres = 40;

  const showedText =
    news.text.length > maxCaracteres
      ? `${news.text.slice(0, maxCaracteres)}...`
      : news.text;

  return (
    <div className={styles.card}>
      <img src={news.image} alt="imagem" />
      <div>
        <h4>{news.title}</h4>
        <br />
        <p dangerouslySetInnerHTML={{ __html: showedText }} />
        <br />
        <p className={styles.date}>{formated}</p>
      </div>
    </div>
  );
}
