import { all } from "redux-saga/effects";
import knowledgeAreasSaga from "./knowledgeAreas/knowledgeAreas.sagas";

function* Sagas() {
  yield all([knowledgeAreasSaga()]);
}

export default Sagas;
