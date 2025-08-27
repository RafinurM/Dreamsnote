import style from "./HeaderUI.module.scss";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import siteConfig from "../../../../config/site.config";
import type { FC } from "react";
import type { IUser } from "../../../../types/user";

interface IHeaderUIProps {
  handleClick: () => void;
  user: IUser | null;
}
export const HeaderUI: FC<IHeaderUIProps> = ({ handleClick, user }) => {
  return (
    <header className={style.header}>
      <h1 className={clsx(style.title, style.title_animated)}>
        {siteConfig.title.split("").map((letter) => {
          return (
            <div key={uuidv4()} className={style.title_letter}>
              {letter}
            </div>
          );
        })}
      </h1>
      <nav className={style.navigation}>
        <button className={style.navigation_login} onClick={handleClick}>
          {user ? user.name : "Login"}
        </button>
      </nav>
    </header>
  );
};
