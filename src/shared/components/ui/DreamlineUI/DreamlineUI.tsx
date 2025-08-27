import type { FC } from "react";
import type { IDream } from "../../../../types/dreams";
import type { IUser } from "../../../../types/user";
import style from "./DreamlineUI.module.scss";
import clsx from "clsx";

interface IDreamlineUIProps {
  isVisible: boolean;
  currentDream: IDream;
  createdYear: number | undefined;
  user: IUser | null;
  changeDream: () => void;
  likeDream: (userId: number, dreamId: number) => void;
  handleGoFull: (dreamId: number) => void;
  changeCover: () => void;
}

export const DreamlineUI: FC<IDreamlineUIProps> = ({
  isVisible,
  currentDream,
  createdYear,
  user,
  changeDream,
  likeDream,
  handleGoFull,
  changeCover,
}) => {
  return (
    <div className={style.dreamline}>
      {isVisible && (
        <div className={style.dreamline_story}>
          <div className={style.dreamline_header}>
            <h4 className={style.dreamline_story_name}>{currentDream.title}</h4>
            <span className={style.dreamline_story_author}>
              {currentDream.id ?? ""}
            </span>
            <span className={style.dreamline_story_date}>
              {typeof createdYear === "number" ? createdYear : ""}
            </span>
          </div>
          <span className={style.dreamline_story_text} onClick={changeDream}>
            {currentDream.content}
          </span>
          <div className={style.dreamline_footer}>
            <div className={style.dreamline_actions}>
              {user ? (
                <button
                  onClick={async () => {
                    try {
                      await likeDream(user.id, currentDream.id);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className={clsx(
                    style.dreamline_action,
                    style.dreamline_action_like
                  )}
                >
                  Нравится
                </button>
              ) : null}

              <button
                onClick={() => handleGoFull(currentDream.id)}
                className={clsx(
                  style.dreamline_action,
                  style.dreamline_action_full
                )}
              >
                Читать полностью
              </button>
              <button
                onClick={changeCover}
                className={clsx(
                  style.dreamline_action,
                  style.dreamline_action_back
                )}
              >
                Вернуться
              </button>
            </div>
            <span className={clsx(style.dreamline_likes)}>
              Likes: {currentDream.likes?.length ?? 0}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
