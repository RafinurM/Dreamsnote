import type { FC } from "react";
import style from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
import { useDreams } from "../../../store/use-dreams-store";
import { useSetAuth, useSetUser, useUser } from "../../../store/use-user-store";
import { removeAccessToken } from "../../../utils/dreamers-api";

export const Profile: FC = () => {
  const navigate = useNavigate();
  const dreams = useDreams();
  const user = useUser();
  const setUser = useSetUser();
  const setAuth = useSetAuth();
  const handleClick = (id: number | undefined): void => {
    navigate(`/dreams/${id}`, { state: { background: "/" } });
  };
  const handleLogout = (): void => {
    setUser(null);
    setAuth(false);
    navigate("/");
    try {
      removeAccessToken();
      localStorage.removeItem("refreshToken");
    } catch {
      alert("Ошибка выхода");
    }
  };
  return (
    <div className={style.profile}>
      <span>Имя: {user ? user.name : "аноним"}</span>
      <span>Email: {user ? user.email : "неизвестный email"}</span>
      <span className={style.dreams}>Мои записи</span>
      <ul className={style.dreams_list}>
        {dreams.map((dream) => {
          if (dream.userId === user?.id) {
            return (
              <li className={style.dreams_item} key={dream.id}>
                <button
                  className={style.dreams_item_link}
                  onClick={() => handleClick(dream.id)}
                >
                  {dream.title}
                </button>
              </li>
            );
          }
        })}
      </ul>
      <button className={style.logout} onClick={handleLogout}>выйти из профиля</button>
    </div>
  );
};
