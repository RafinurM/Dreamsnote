import { useLocation, useNavigate } from "react-router-dom";
import type { FC } from "react";
import { useUser } from "../../../store/use-user-store";
import { HeaderUI } from "../ui/HeaderUI";


export const Header: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUser();
  const handleClick = (): void => {
    navigate("/login", { state: { background: location } });
  };
  return <HeaderUI user={user} handleClick={handleClick}/>
};
