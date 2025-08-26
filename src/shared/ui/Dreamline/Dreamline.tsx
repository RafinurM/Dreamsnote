import { useState, type FC } from "react";
import style from "./Dreamline.module.scss";
import clsx from "clsx";
import { changeCover } from "../../../store/use-app-store";
import { useNavigate } from "react-router-dom";
import { useDreams, useLikeDream } from "../../../store/use-dreams-store";
import { useUser } from "../../../store/use-user-store";

interface IDreamlineProps {
  isVisible: boolean;
}

export const Dreamline: FC<IDreamlineProps> = ({ isVisible }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();
  const user = useUser();
  const dreams = useDreams();
  const currentDream =
    dreams && dreams.length > 0 ? dreams[currentIndex] : null;
  const likeDream = useLikeDream();
  const changeDream = (): void => {
    if (!dreams || dreams.length === 0) return;
    const nextIndex = (currentIndex + 1) % dreams.length;
    setCurrentIndex(nextIndex);
  };

  const handleGoFull = (id: number): void => {
    navigate(`/dreams/${id}`, { state: { background: "/" } });
  };
  if (!isVisible || !currentDream) return null;
  const createdYear = currentDream.createdAt
    ? new Date(currentDream.createdAt).getFullYear?.()
    : undefined;
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
                onClick={changeCover()}
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
