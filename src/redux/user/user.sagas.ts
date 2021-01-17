import { all, put, takeLatest } from "redux-saga/effects";
import { usersCollection } from "../../constants/database-collections";
import User from "../../entities/User";
import { firestore, auth } from "../../firebase";
import { UserActions, UserTypes } from "./user.ducks";

type registerUserAction = {
  type: typeof UserTypes.REGISTER_USER_REQUESTED;
  data: User & { password: string };
};
function* registerUserSaga({ data }: registerUserAction) {
  try {
    yield auth.createUserWithEmailAndPassword(data.email, data.password);

    const dataToSave: any = data;
    delete dataToSave.password;
    yield firestore.collection(usersCollection).add(dataToSave);
  } catch (error) {
    yield put(UserActions.registerUserFailed(error));
  }
}

export default function* userSaga() {
  yield all([takeLatest(UserTypes.REGISTER_USER_REQUESTED, registerUserSaga)]);
}
