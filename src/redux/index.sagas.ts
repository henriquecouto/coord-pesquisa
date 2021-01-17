import { all } from "redux-saga/effects";
import knowledgeAreasSaga from "./knowledgeAreas/knowledgeAreas.sagas";
import academicTitlesSaga from "./academicTitles/academicTitles.sagas";

function* Sagas() {
  yield all([knowledgeAreasSaga(), academicTitlesSaga()]);
}

export default Sagas;
