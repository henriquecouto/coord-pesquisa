import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import routes from "./constants/routes";
import { auth } from "./firebase";
import IGlobalState from "./redux/definitions/GlobalState";
import { UserActions } from "./redux/user/user.ducks";
import Login from "./screens/Login";
import Register from "./screens/Register";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hasUser, setHasUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const userReducer = useSelector((state: IGlobalState) => state.userReducer);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setHasUser(true);
        dispatch(UserActions.getLoggedUserRequested());
      }
      setLoading(false);
    });
  }, [dispatch, history]);

  if (loading || userReducer.loading) {
    return <h1>loading...</h1>;
  }

  if (!hasUser) {
    return (
      <Switch>
        <Route exact path={routes.login}>
          <Login />
        </Route>
        <Route exact path={routes.register}>
          <Register />
        </Route>
        <Redirect to={routes.login} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path={routes.home}>
        <h1>Home</h1>
      </Route>
      <Redirect to={routes.home} />
    </Switch>
  );
};

export default App;
