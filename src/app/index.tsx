import ModalsManager from "@src/containers/modals-manager";
import Protected from "@src/containers/protected";
import useInit from "@src/hooks/use-init";
import useStore from "@src/hooks/use-store";
import SessionModule from "@src/store/session";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Article from "./article";
import Chat from "./chat";
import DrawingPage from "./drawing";
import Login from "./login";
import Main from "./main";
import Profile from "./profile";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App(): JSX.Element {
  const store = useStore();

  useInit({
    callback: async () => {
      await store.get<SessionModule>("session").remind();
    },
  });

  //const modal = useSelector(state => state.modals.name);
  // const modal = useSelectorRedux(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/profile"}
          element={
            <Protected redirect={"/login"}>
              <Profile />
            </Protected>
          }
        />
        <Route
          path={"/chat"}
          element={
            <Protected redirect={"/login"}>
              <Chat />
            </Protected>
          }
        />
        <Route path={"/drawing"} element={<DrawingPage />} />
      </Routes>
      <ModalsManager />
    </>
  );
}

export default React.memo(App);
