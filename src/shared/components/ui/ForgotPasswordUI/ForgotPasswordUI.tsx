import style from "./ForgotPasswordUI.module.scss";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordSchema } from "../../../../utils/zod-schema";
import type { FC } from "react";

interface IForgotPasswordUI {
  handleLogin: () => void;
  onSubmit: SubmitHandler<ForgotPasswordSchema>
}

export const ForgotPasswordUI: FC<IForgotPasswordUI> = ({ handleLogin, onSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });
  return (
    <>
      <form className={style.forgot} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className={style.forgot_label}>
          Восстановление пароля
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          name="email"
          className={style.forgot_input}
          required
          placeholder="Введите email"
          aria-invalid={errors.email ? true : false}
        />
        {errors.email && (
          <span role="alert" className={style.login_error}>
            {errors.email?.message}
          </span>
        )}
        <button
          type="submit"
          className={style.forgot_button}
          disabled={!isValid || isSubmitting}
        >
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
