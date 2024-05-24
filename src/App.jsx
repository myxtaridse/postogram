import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./app.scss";

import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Main from "./pages/Main";
import User from "./pages/User";
import Register from "./pages/Register";

const App = () => {
  const state = useSelector((state) => state.users);
  const [isIdRequest, setIsIdRequest] = React.useState(true);
  const navigate = useNavigate();
  const [dataUser, setDataUser] = React.useState();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    } else if (dataUser) {
      console.log(dataUser);
      localStorage.setItem("data", JSON.stringify(dataUser));
    }
  }, [dataUser]);

  return (
    <Routes>
      <Route
        path=""
        element={<MainLayout dataUser={dataUser} isIdRequest={isIdRequest} />}
      >
        <>
          <Route path="/" element={<Main />} />
          <Route
            path="/:id"
            element={
              <User dataUser={dataUser} setIsIdRequest={setIsIdRequest} />
            }
          />
        </>

        <>
          <Route path="/auth" element={<Login setDataUser={setDataUser} />} />
          <Route
            path="/register"
            element={<Register setDataUser={setDataUser} />}
          />
        </>
      </Route>
    </Routes>
  );
};

export default App;
