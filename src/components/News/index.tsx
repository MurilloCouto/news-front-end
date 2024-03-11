import { format } from "date-fns";
import styles from "./index.module.scss";

export interface NewsProps {
  _id: string;
  title: string;
  image: string;
  text: string;
  createdAt: string;
}

export function NewsSection({ news }: { news: NewsProps[] }) {
  return (
    <div className={styles.container}>
      <section>
        {news
          .slice()
          .reverse()
          .map((item) => {
            const created = new Date(item.createdAt);
            const formatted = format(created, "dd/MM/yyyy 'às' HH'h'mm'min'");

            return (
              <div className={styles.content} key={item._id}>
                <img src={item.image} alt="news" />
                <div>
                  <h2>{item.title}</h2>
                  <p className={styles.date}>{formatted}</p>
                  <p dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}
