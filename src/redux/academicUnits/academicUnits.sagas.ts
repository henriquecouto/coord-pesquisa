import { all, put, takeLatest } from "redux-saga/effects";
import academicUnitAdapter from "../../adapters/academicUnitAdapter";
import { academicUnitsCollection } from "../../constants/database-collections";
import { database } from "../../firebase";
import {
  AcademicUnitsActions,
  AcademicUnitsTypes,
} from "./academicUnits.ducks";

function* getAcademicUnitsSaga() {
  try {
    const data: Array<any> = (yield database
      .ref(academicUnitsCollection)
      .once("value")).val();

    yield put(
      AcademicUnitsActions.getAcademicUnitsSucceeded(
        data.map(academicUnitAdapter)
      )
    );
  } catch (error) {
    yield put(AcademicUnitsActions.getAcademicUnitsFailed(error));
  }
}

export default function* academicUnitsSaga() {
  yield all([
    takeLatest(
      AcademicUnitsTypes.GET_ACADEMIC_UNITS_REQUESTED,
      getAcademicUnitsSaga
    ),
  ]);
}
