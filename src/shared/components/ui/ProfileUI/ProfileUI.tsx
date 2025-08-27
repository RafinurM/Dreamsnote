import type { FC } from "react";
import style from "./ProfileUI.module.scss";
import type { IUser } from "../../../../types/user";
import type { IDream } from "../../../../types/dreams";

interface IProfileUIProps {
  user: IUser | null;
  dreams: IDream[];
  handleClick: (id: number) => void;
  handleLogout: () => void;
}

export const ProfileUI: FC<IProfileUIProps> = ({ user, dreams, handleClick, handleLogout}) => {
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
