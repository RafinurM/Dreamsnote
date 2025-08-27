import style from "./RegisterUI.module.scss";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  registerFormSchema,
  type RegisterFormSchema,
} from "../../../../utils/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";

interface IRegisterUIProps {
  onSubmit: SubmitHandler<RegisterFormSchema>;
  handleLogin: () => void;
}
export const RegisterUI: FC<IRegisterUIProps> = ({ onSubmit, handleLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
  });
  return (
    <form
      className={style.register}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label htmlFor="name" className={style.register_label}>
        Ваше имя
      </label>
      <input
        {...register("name", { required: true })}
        type="text"
        id="name"
        className={style.register_input}
        placeholder="Введите имя"
        aria-invalid={errors.name ? "true" : "false"}
      />
      {errors.name && (
        <span role="alert" className={style.register_error}>
          {errors.name?.message}
        </span>
      )}
      <label htmlFor="email" className={style.register_label}>
        Ваш адрес электронной почты
      </label>
      <input
        {...register("email")}
        type="email"
        id="email"
        name="email"
        className={style.register_input}
        placeholder="Введите электронную почту"
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email && (
        <span role="alert" className={style.register_error}>
          {errors.email?.message}
        </span>
      )}

      <label htmlFor="password" className={style.register_label}>
        Придумайте пароль
      </label>
      <input
        {...register("password")}
        type="password"
        id="password"
        name="password"
        className={style.register_input}
        placeholder="Минимум 6 знаков"
        aria-invalid={errors.password ? "true" : "false"}
      />
      {errors.password && (
        <span role="alert" className={style.register_error}>
          {errors.password?.message}
        </span>
      )}
      <button
        type="submit"
        className={style.register_button}
        disabled={!isValid || isSubmitting}
      >
        Зарегистрироватся
      </button>
      <span className={style.tip}>
        Есть аккаунт?{" "}
        <span onClick={handleLogin} className={style.link}>
          Войти
        </span>
      </span>
    </form>
  );
};
