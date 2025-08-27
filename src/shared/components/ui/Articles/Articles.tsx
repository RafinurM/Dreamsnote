import { type FC } from "react";
import style from "./Articles.module.scss";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { articles } from "../../../api/mock";
import type { IArticle } from "../../../../types/article";

// interface IArticlesProps {
//   // onClick: () => void;
// }

export const Articles: FC = () => {
  const navigate = useNavigate();
  const handleClick = (id: string): void => {
    navigate(`/article/${id}`, { state: { background: "/" } });
  };
  return (
    <>
      <div className={style.articles}>
        {articles.map((article: IArticle) => {
          return (
            <button
              role="listitem"
              key={article.id}
              onClick={() => handleClick(article.id)}
              className={clsx(style.acticle_title, style.article)}
              aria-label={`Открыть статью: ${article.title}`}
            >
              <h3 className={style.article_name}>{article.title}</h3>
            </button>
          );
        })}
      </div>
    </>
  );
};
