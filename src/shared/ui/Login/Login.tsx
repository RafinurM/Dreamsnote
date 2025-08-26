import { useEffect, type FC } from "react";
import style from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { loginUserApi } from "../../../utils/dreamers-api";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  loginFormSchema,
  type LoginFormSchema,
} from "../../../utils/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetUser } from "../../../store/use-user-store";

export const Login: FC = () => {
  const navigate = useNavigate();
  const setUser = useSetUser();
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });
  const handleRegister = (): void => {
    navigate("/register", { state: { background: "/" } });
  };
  const handleForgot = (): void => {
    navigate("/forgot", { state: { background: "/" } });
  };
  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    try {
      const res = await loginUserApi(data);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const message = err?.message ?? "Ошибка входа";
        alert(message);
        return;
      }
      const responseData = await res.json();
      localStorage.setItem("token", responseData.accessToken);
      setUser(responseData.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Ошибка сети");
    } finally {
      reset();
    }
  };
  useEffect(() => {
    setFocus("name")
  }, [])
  return (
    <form className={style.login} onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="name" className={style.login_label}>
        Ваше имя
      </label>
      <input
        {...register("name")}
        type="text"
        id="name"
        name="name"
        className={style.login_input}
        required
        minLength={4}
        maxLength={16}
        placeholder="Введите имя"
        aria-invalid={errors.name ? true : false}
      />
      {errors.name && (
        <span role="alert" className={style.login_error}>
          {errors.name?.message}
        </span>
      )}

      <label htmlFor="password" className={style.login_label}>
        Ваш пароль
      </label>
      <input
        {...register("password")}
        type="password"
        id="password"
        name="password"
        className={style.login_input}
        required
        minLength={6}
        maxLength={28}
        placeholder="Введите пароль"
        aria-invalid={errors.password ? true : false}
      />
      {errors.password && (
        <span role="alert" className={style.login_error}>
          {errors.password?.message}
        </span>
      )}
      <button type="submit" className={style.login_button} disabled={!isValid || isSubmitting}>
        Войти
      </button>
      <span className={style.tip}>
        Нет аккаунта?{" "}
        <button className={style.link_button} onClick={handleRegister}>
          Зарегистрироватся
        </button>
      </span>
      <span className={style.tip}>
        Забыли пароль?{" "}
        <button className={style.link_button} onClick={handleForgot}>
          Восстановить пароль
        </button>
      </span>
    </form>
  );
};
