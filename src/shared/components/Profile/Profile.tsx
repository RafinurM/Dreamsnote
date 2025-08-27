import type { FC } from "react";
import { ProfileUI } from "../ui/ProfileUI";
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
    <ProfileUI
      user={user}
      dreams={dreams}
      handleClick={handleClick}
      handleLogout={handleLogout}
    />
  );
};
