import type { FC } from "react";
import style from "./DreamUI.module.scss";
import type { IDream } from "../../../../types/dreams";

interface IDreamUIProps {
  dream: IDream | null;
}

export const DreamUI: FC<IDreamUIProps> = ({ dream }) => {
  return (
    <div className={style.dreamstory}>
      <h3 className={style.dreamstory_title}>{dream?.title}</h3>
      <span className={style.dreamstory_text}>{dream?.content}</span>
      <div className={style.dreamstory_footer}>
        <span className={style.dreamstory_footer_author}>
          {dream?.userId ? dream.userId : "Неизвестный автор"}
        </span>
        <span className={style.dreamstory_footer_date}>
          {/* {dream?.createdAt.getFullYear()}/{dream?.createdAt.getDate()}/{dream?.createdAt.getMonth()}  */}
          {/* TODO: FIX THIS */}
        </span>
      </div>
      <div className={style.dreamstory_actions}>
        <button type="button" className={style.share_button}>
          Поделитесь
        </button>
      </div>
    </div>
  );
};
