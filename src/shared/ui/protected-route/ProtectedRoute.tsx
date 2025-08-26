import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../../../store/use-user-store";
// import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isPublic?: boolean;
};

export const ProtectedRoute = ({ children, isPublic }: ProtectedRouteProps) => {
  // const isAuthCheck = useSelector(userAuthCheck);
  const user = useUser();
  const navigate = useNavigate();
  // const location = useLocation();
  // if (!isAuthCheck) {
  //   return <Preloader />;
  // }
  useEffect(() => {
    if (isPublic && user) {
      navigate("/profile", { state: { background: "/" } });
      // return (
      //   <Navigate
      //     to="/profile"
      //     state={{
      //       from: location.state,
      //     }}
      //   />
      // );
      if (!user && !isPublic) {
        navigate("/login", { state: { background: "/" } });
        // return (
        //   <Navigate
        //     to="/login"
        //     state={{
        //       from: location.state,
        //     }}
        //   />
        // );
      }
    }
  }, []);

  return children;
};
