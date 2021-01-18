import { OptionsObject as SnackOptions } from "notistack";
import { all, put, takeLatest } from "redux-saga/effects";
import { usersCollection } from "../../constants/database-collections";
import firebaseErrors from "../../constants/firebase-errors";
import User from "../../entities/User";
import { firestore, auth } from "../../firebase";
import { UserActions, UserTypes } from "./user.ducks";

type registerUserAction = {
  type: typeof UserTypes.REGISTER_USER_REQUESTED;
  data: User & { password: string };
  callback: (message: React.ReactNode, options: SnackOptions) => void;
};
function* registerUserSaga({ data, callback }: registerUserAction) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(
      data.email,
      data.password
    );
    const dataToSave: any = data;
    delete dataToSave.password;
    yield firestore.collection(usersCollection).doc(user.uid).set(dataToSave);
    yield put(UserActions.registerUserSucceeded(new User(data)));
    callback("Usuário cadastrado com sucesso!", { variant: "success" });
  } catch (error) {
    yield put(UserActions.registerUserFailed(error));
    callback(firebaseErrors[error.code], { variant: "error" });
  }
}

function* getLoggedUserSaga() {
  try {
    const snapshot = yield firestore
      .collection(usersCollection)
      .doc(auth.currentUser?.uid)
      .get();
    yield put(UserActions.getLoggedUserSucceeded(new User(snapshot.data())));
  } catch (error) {
    yield put(UserActions.getLoggedUserFailed(error));
  }
}

type makeLoginAction = {
  type: typeof UserTypes.MAKE_LOGIN;
  email: string;
  password: string;
  callback: (message: React.ReactNode, options: SnackOptions) => void;
};
function* makeLoginSaga({ email, password, callback }: makeLoginAction) {
  try {
    yield auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    yield put(UserActions.makeLoginFailed(error));
    callback(firebaseErrors[error.code], { variant: "error" });
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(UserTypes.REGISTER_USER_REQUESTED, registerUserSaga),
    takeLatest(UserTypes.GET_LOGGED_USER_REQUESTED, getLoggedUserSaga),
    takeLatest(UserTypes.MAKE_LOGIN, makeLoginSaga),
  ]);
}
