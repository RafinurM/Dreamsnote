import { useLocation, useNavigate } from "react-router-dom";
import style from "./Header.module.scss";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import siteConfig from "../../../config/site.config";
import { useUser } from "../../../store/use-user-store";


export const HeaderUI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUser();
  const handleClick = (): void => {
    navigate("/login", { state: { background: location } });
  };
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
