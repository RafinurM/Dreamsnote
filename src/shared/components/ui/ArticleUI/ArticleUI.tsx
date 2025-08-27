import style from "./ArticleUI.module.scss";
import type { IArticle } from "../../../../types/article";
import type { FC } from "react";

interface IArticleUIProps {
  item: IArticle | null;
}
export const ArticleUI: FC<IArticleUIProps> = ({ item }) => {
  return (
    <section
      role="article"
      aria-label={item?.title ?? "статья"}
      className={style.content}
    >
      {item ? item.content : "Статья не найдена"}
    </section>
  );
};
