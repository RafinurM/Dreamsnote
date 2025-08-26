import style from "./App.module.scss";
import { Articles } from "../shared/ui/Articles";
import { Grid } from "../shared/ui/bgDecoration/grid-ui/Grid";
import { DreamSender } from "../shared/ui/DreamSender/DreamSender";
import { HeaderUI } from "../shared/ui/header-ui/HeaderUI";
import { Modal } from "../shared/ui/Modal/Modal";
import { Profile } from "../shared/ui/Profile";
import { Login } from "../shared/ui/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import { NotFound404 } from "../shared/pages/NotFound404";
import { Register } from "../shared/ui/Register";
import { Article } from "../shared/ui/Article";
import { Forgot } from "../shared/ui/Forgot";
import { Dream } from "../shared/ui/Dream";
import { ProtectedRoute } from "../shared/ui/protected-route";
import { Success } from "../shared/ui/Success/Success";

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
              <HeaderUI />
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
            path="/forgot"
            element={
              <ProtectedRoute isPublic>
                <Modal>
                  <Forgot />
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
