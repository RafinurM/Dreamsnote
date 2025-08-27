import { useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSetUser } from "../../../store/use-user-store";
import type { LoginFormSchema } from "../../../utils/zod-schema";
import { loginUserApi } from "../../../utils/dreamers-api";
import { LoginUI } from "../ui/LoginUI";

export const Login: FC = () => {
  const navigate = useNavigate();
  const setUser = useSetUser();
  const { setFocus, reset } = useForm();
  const handleRegister = (): void => {
    navigate("/register", { state: { background: "/" } });
  };
  const handleForgotPassword = (): void => {
    navigate("/forgot-password", { state: { background: "/" } });
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
    setFocus("name");
  }, [setFocus]);
  return (
    <LoginUI
      onSubmit={onSubmit}
      handleRegister={handleRegister}
      handleForgotPassword={handleForgotPassword}
    />
  );
};
