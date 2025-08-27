import style from "./App.module.scss";
import { Articles } from "../shared/components/ui/Articles";
import { Grid } from "../shared/components/ui/bgDecoration/grid-ui/Grid";
import { Modal } from "../shared/components/ui/Modal/Modal";
import { Route, Routes, useLocation } from "react-router-dom";
import { NotFound404 } from "../shared/pages/NotFound404";
import { ProtectedRoute } from "../shared/components/ui/protected-route";
import { ResetPasswordUI } from "../shared/components/ui/ResetPasswordUI/ResetPasswordUI";
import { Article } from "../shared/components/Article";
import { DreamSender } from "../shared/components/DreamSender";
import { Dream } from "../shared/components/Dream";
import { ForgotPassword } from "../shared/components/ForgotPassword";
import { Header } from "../shared/components/Header";
import { Login } from "../shared/components/Login";
import { Profile } from "../shared/components/Profile";
import { Register } from "../shared/components/Register";
import { Success } from "../shared/components/Success";

function App() {
  const location = useLocation();
  const backgroundLocation = location.state && location.state.background;
  return (
    <div className={style.app}>
      <Routes location={backgroundLocation || location}>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Grid />
              <Articles />
              <DreamSender />
            </>
          }
        ></Route>
        <Route
          path="*"
          element={
            <Modal>
              <NotFound404 />
            </Modal>
          }
        ></Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute isPublic>
                <Modal>
                  <Login />
                </Modal>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <ProtectedRoute isPublic>
                <Modal>
                  <Register />
                </Modal>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute isPublic>
                <Modal>
                  <ForgotPassword />
                </Modal>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute isPublic>
                <Modal>
                  <ResetPasswordUI />
                </Modal>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Modal>
                  <Profile />
                </Modal>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Modal>
                  <Success />
                </Modal>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/dreams/:id"
            element={
              <ProtectedRoute>
                <Modal>
                  <Dream />
                </Modal>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/article/:id"
            element={
              <ProtectedRoute>
                <Modal>
                  <Article />
                </Modal>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
