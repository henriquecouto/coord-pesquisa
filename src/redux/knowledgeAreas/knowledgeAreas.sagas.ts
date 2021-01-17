import { all, put, takeLatest } from "redux-saga/effects";
import knowledgeAreaAdapter from "../../adapters/knowledgeAreaAdapter";
import { knowledgeAreasCollection } from "../../constants/database-collections";
import { database } from "../../firebase";
import collectAllKnowledgeAreas from "../../helpers/collectAllKnowledgeAreas";
import {
  KnowledgeAreasActions,
  KnowledgeAreasTypes,
} from "./knowledgeAreas.ducks";

function* getKnowledgeAreasSaga() {
  try {
    const data: Array<any> = collectAllKnowledgeAreas(
      (yield database.ref(knowledgeAreasCollection).once("value")).val()
    );

    yield put(
      KnowledgeAreasActions.getKnowledgeAreasSucceeded(
        data.map(knowledgeAreaAdapter)
      )
    );
  } catch (error) {
    yield put(KnowledgeAreasActions.getKnowledgeAreasFailed(error));
  }
}

export default function* knowledgeAreasSaga() {
  yield all([
    takeLatest(
      KnowledgeAreasTypes.GET_KNOWLEDGE_AREAS_REQUESTED,
      getKnowledgeAreasSaga
    ),
  ]);
}
