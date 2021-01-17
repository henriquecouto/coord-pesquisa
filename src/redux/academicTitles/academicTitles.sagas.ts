import { all, put, takeLatest } from "redux-saga/effects";
import academicTitleAdapter from "../../adapters/academicTitleAdapter";
import { academicTitlesCollection } from "../../constants/database-collections";
import { database } from "../../firebase";
import {
  AcademicTitlesActions,
  AcademicTitlesTypes,
} from "./academicTitles.ducks";

function* getAcademicTitlesSaga() {
  try {
    const data: Array<any> = (yield database
      .ref(academicTitlesCollection)
      .once("value")).val();

    yield put(
      AcademicTitlesActions.getAcademicTitlesSucceeded(
        data.map(academicTitleAdapter)
      )
    );
  } catch (error) {
    yield put(AcademicTitlesActions.getAcademicTitlesFailed(error));
  }
}

export default function* academicTitlesSaga() {
  yield all([
    takeLatest(
      AcademicTitlesTypes.GET_ACADEMIC_TITLES_REQUESTED,
      getAcademicTitlesSaga
    ),
  ]);
}
