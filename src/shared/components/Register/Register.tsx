import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, type FC } from "react";
import type { RegisterFormSchema } from "../../../utils/zod-schema";
import { registerUserApi } from "../../../utils/dreamers-api";
import { RegisterUI } from "../ui/RegisterUI";

export const Register: FC = () => {
  const navigate = useNavigate();
  const { setFocus, reset } = useForm();
  const handleLogin = (): void => {
    navigate("/login", { state: { background: "/" } });
  };

  const onSubmit: SubmitHandler<RegisterFormSchema> = async (data) => {
    try {
      const responce = await registerUserApi(data);
      if (responce.ok) {
        navigate("/login", { state: { background: "/" } });
      }
    } catch {
      throw new Error("Network error");
    } finally {
      reset();
    }
  };

  useEffect(() => {
    setFocus("name");
  }, []);
  return <RegisterUI onSubmit={onSubmit} handleLogin={handleLogin} />;
};
