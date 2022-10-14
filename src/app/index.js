import ModalsManager from '@src/containers/modals-manager';
import Protected from "@src/containers/protected";
import useInit from "@src/hooks/use-init";
import useStore from "@src/hooks/use-store";
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Article from "./article";
import Chat from "./chat";
import Login from "./login";
import Main from "./main";
import Profile from "./profile";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  useInit(async () => {
    await store.get("session").remind();
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
      </Routes>
      <ModalsManager />
    </>
  );
}

export default React.memo(App);
