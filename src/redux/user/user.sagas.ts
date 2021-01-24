import { OptionsObject as SnackOptions } from "notistack";
import { all, put, takeLatest } from "redux-saga/effects";
import academicTitleAdapter from "../../adapters/academicTitleAdapter";
import academicUnitAdapter from "../../adapters/academicUnitAdapter";
import knowledgeAreaAdapter from "../../adapters/knowledgeAreaAdapter";
import {
  academicTitlesCollection,
  academicUnitsCollection,
  knowledgeAreasCollection,
  usersCollection,
} from "../../constants/database-collections";
import firebaseErrors from "../../constants/firebase-errors";
import Course from "../../entities/Course";
import User from "../../entities/User";
import { firestore, auth, database } from "../../firebase";
import collectAllKnowledgeAreas from "../../helpers/collectAllKnowledgeAreas";
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
    const snapshot = (yield firestore
      .collection(usersCollection)
      .doc(auth.currentUser?.uid)
      .get()).data();

    snapshot.course = new Course({ name: snapshot.course });

    snapshot.knowledgeArea = knowledgeAreaAdapter(
      collectAllKnowledgeAreas(
        (yield database.ref(knowledgeAreasCollection).once("value")).val()
      ).find((item: any) => item.codigo === snapshot.knowledgeArea)
    );

    snapshot.academicUnit = academicUnitAdapter(
      (yield database.ref(academicUnitsCollection).once("value"))
        .val()
        .find((item: any) => item.id === snapshot.academicUnit)
    );

    snapshot.academicTitle = academicTitleAdapter(
      (yield database.ref(academicTitlesCollection).once("value"))
        .val()
        .find((item: any) => item.id === snapshot.academicTitle)
    );

    yield put(UserActions.getLoggedUserSucceeded(new User(snapshot)));
  } catch (error) {
    yield put(UserActions.getLoggedUserFailed(error));
  }
}

type changeProfileAction = {
  type: typeof UserTypes.CHANGE_PROFILE;
  data: User;
  callback: (message: React.ReactNode, options: SnackOptions) => void;
};
function* changeProfileSaga({ data, callback }: changeProfileAction) {
  try {
    yield firestore
      .collection(usersCollection)
      .doc(auth.currentUser?.uid)
      .set(data);
    yield put(UserActions.getLoggedUserRequested());
    callback("Perfil atualizado com sucesso!", { variant: "success" });
  } catch (error) {
    yield put(UserActions.changeProfileFailed(error));
    callback("Ocorreu um erro ao atualizar seu perfil!", { variant: "error" });
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

function* makeLogoutSaga() {
  try {
    yield auth.signOut();
  } catch (error) {
    console.log(error);
    yield put(UserActions.makeLoginFailed(error));
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(UserTypes.REGISTER_USER_REQUESTED, registerUserSaga),
    takeLatest(UserTypes.GET_LOGGED_USER_REQUESTED, getLoggedUserSaga),
    takeLatest(UserTypes.CHANGE_PROFILE, changeProfileSaga),
    takeLatest(UserTypes.MAKE_LOGIN, makeLoginSaga),
    takeLatest(UserTypes.MAKE_LOGOUT, makeLogoutSaga),
  ]);
}
