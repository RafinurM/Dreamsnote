import { useParams } from "react-router-dom";
import { articles } from "../../api/mock";
import style from "./Article.module.scss";
import type { IArticle } from "../../../types/article";

export const Article = () => {
  const { id } = useParams();
  const item = articles.find((item: IArticle) => item.id === id);
  return (
    <section
      role="article"
      aria-label={item?.title ?? "статья"}
      className={style.content}
    >
      {item ? item.content : 'Статья не найдена'}
    </section>
  );
};
