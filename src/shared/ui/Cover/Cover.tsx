import { type FC } from "react";
import style from "./Cover.module.scss";
import clsx from "clsx";
import { useAppStore, useCoverIsActive } from "../../../store/use-app-store";
import siteConfig from "../../../config/site.config";

export const Cover: FC = () => {
  const coverIsActive = useCoverIsActive();
  const handleToggle = useAppStore((state) => state.changeCover);
  return (
    <div
      className={clsx(style.cover, !coverIsActive && style.cover_unactive)}
      aria-label="Обложка"
      role="region"
    >
      <button
        className={style.open_book}
        onClick={handleToggle}
        aria-label={coverIsActive ? "закрыть обложку" : "открыть обложку"}
      >
        <div
          className={clsx(
            style.border_element,
            style.border_element_top,
            coverIsActive && style.border_element_active
          )}
        ></div>
        <div
          className={clsx(
            style.border_element,
            style.border_element_start,
            coverIsActive && style.border_element_active
          )}
        >
          {siteConfig.adv}
        </div>
        <div
          className={clsx(
            style.border_element,
            style.border_element_front,
            coverIsActive && style.border_element_active
          )}
        ></div>
        <div
          className={clsx(
            style.border_element,
            style.border_element_back,
            coverIsActive && style.border_element_active
          )}
        >
          {siteConfig.adv}
        </div>
        <div
          className={clsx(
            style.border_element,
            style.border_element_end,
            coverIsActive && style.border_element_active
          )}
        ></div>
        <div
          className={clsx(
            style.border_element,
            style.border_element_bottom,
            coverIsActive && style.border_element_active
          )}
        >
          {siteConfig.adv}
        </div>
        <div
          className={clsx(
            style.border_element,
            style.border_element_adv,
            coverIsActive && style.border_element_active
          )}
        ></div>
      </button>
    </div>
  );
};
