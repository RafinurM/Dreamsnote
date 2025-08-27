import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ForgotPasswordUI } from "../ui/ForgotPasswordUI";
import { useEffect, type FC } from "react";
import type { ForgotPasswordSchema } from "../../../utils/zod-schema";
import { forgotPasswordApi } from "../../../utils/dreamers-api";

export const ForgotPassword: FC = () => {
  const { setFocus, reset } = useForm();
  const navigate = useNavigate();
  const handleLogin = (): void => {
    navigate("/login", { state: { background: "/" } });
  };
  const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (data) => {
    const res = await forgotPasswordApi(data);
    const dt = await res.json();
    console.log(dt);
    reset();
  };

  useEffect(() => {
    setFocus("email");
  }, []);
  return <ForgotPasswordUI handleLogin={handleLogin} onSubmit={onSubmit} />;
};
