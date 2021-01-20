import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Switch,
  Route,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import routes from "./constants/routes";
import { auth } from "./firebase";
import { UserActions } from "./redux/user/user.ducks";
import Login from "./screens/Login";
import Register from "./screens/Register";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [hasUser, setHasUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setHasUser(true);
        dispatch(UserActions.getLoggedUserRequested());
      } else {
        setHasUser(false);
      }
      setLoading(false);
    });
  }, [dispatch, history]);

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (!hasUser) {
    return (
      <Switch>
        <Route exact path={routes.login.path}>
          <Login />
        </Route>
        <Route exact path={routes.register.path}>
          <Register />
        </Route>
        <Redirect to={routes.login.path} />
      </Switch>
    );
  }

  return (
    <Header>
      <Switch>
        <Route exact path={routes.home.path}>
          <h1>Home</h1>
        </Route>
        <Route exact path={routes.profile.path}>
          <h1>Hello profile</h1>
        </Route>
        <Redirect to={routes.home.path} />
      </Switch>
    </Header>
  );
};

export default App;
