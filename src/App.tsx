import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { UserActions } from "./redux/user/user.ducks";
import Register from "./screens/Register";

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) dispatch(UserActions.getLoggedUserRequested());
    });
  }, [dispatch]);
  return <Register />;
};

export default App;
