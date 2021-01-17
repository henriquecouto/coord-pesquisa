import { all } from "redux-saga/effects";
import knowledgeAreasSaga from "./knowledgeAreas/knowledgeAreas.sagas";
import academicTitlesSaga from "./academicTitles/academicTitles.sagas";
import academicUnitsSaga from "./academicUnits/academicUnits.sagas";

function* Sagas() {
  yield all([knowledgeAreasSaga(), academicTitlesSaga(), academicUnitsSaga()]);
}

export default Sagas;
