import { all } from "redux-saga/effects";
import knowledgeAreasSaga from "./knowledgeAreas/knowledgeAreas.sagas";
import academicTitlesSaga from "./academicTitles/academicTitles.sagas";
import academicUnitsSaga from "./academicUnits/academicUnits.sagas";
import userSaga from "./user/user.sagas";

function* Sagas() {
  yield all([
    knowledgeAreasSaga(),
    academicTitlesSaga(),
    academicUnitsSaga(),
    userSaga(),
  ]);
}

export default Sagas;
