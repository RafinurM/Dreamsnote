import type { FC } from "react";
import { useParams } from "react-router-dom";
import { articles } from "../../api/mock";
import type { IArticle } from "../../../types/article";
import { ArticleUI } from "../ui/ArticleUI";

export const Article: FC = () => {
  const { id } = useParams();
  const item = articles.find((item: IArticle) => item.id === id);
  return <ArticleUI item={item ? item : null} />;
};
