import type { FC } from "react";
import style from "./Forgot.module.scss";
import { useNavigate } from "react-router-dom";

export const Forgot: FC = () => {
  const navigate = useNavigate();
  const handleLogin = (): void => {
    navigate("/login", { state: { background: "/" } });
  };
  return (
    <>
      <form className={style.forgot}>
        <label htmlFor="emailName" className={style.forgot_label}>
          Восстановление пароля
        </label>
        <input
          type="email"
          id="emailName"
          name="emailName"
          className={style.forgot_input}
          required
          minLength={4}
          maxLength={16}
          placeholder="Введите email"
        />
        <button type="submit" className={style.forgot_button}>
          Восстановить
        </button>
        <span className={style.tip}>
          Вспомнили пароль?{" "}
          <button onClick={handleLogin} className={style.link}>
            Войти
          </button>
        </span>
      </form>
    </>
  );
};
