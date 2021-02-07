import { all, put, takeLatest } from "redux-saga/effects";
import { questionariesCollection } from "../../constants/database-collections";
import Questionary from "../../entities/Questionary";
import { firestore } from "../../firebase";
import {
  QuestionariesActions,
  QuestionariesTypes,
} from "./questionaries.ducks";

function* getAllQuestionariesSaga() {
  try {
    const snapshot: Questionary[] = [];
    (yield firestore
      .collection(questionariesCollection)
      .get()).forEach((doc: any) =>
      snapshot.push({ ...doc.data(), id: doc.id })
    );

    yield put(QuestionariesActions.getAllQuestionariesSucceeded(snapshot));
  } catch (error) {
    console.log(error);
    yield put(QuestionariesActions.getAllQuestionariesFailed(error));
  }
}

export default function* questionariesSaga() {
  yield all([
    takeLatest(
      QuestionariesTypes.GET_ALL_QUESTIONARIES_REQUESTED,
      getAllQuestionariesSaga
    ),
  ]);
}
