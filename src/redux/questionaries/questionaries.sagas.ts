import { all, put, takeLatest } from "redux-saga/effects";
import {
  questionariesCollection,
  questionariesResponsesCollections,
  questionsCollection,
  sectionsCollection,
  subsectionsCollection,
} from "../../constants/database-collections";
import Questionary from "../../entities/Questionary";
import { auth, firestore } from "../../firebase";
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
    yield put(QuestionariesActions.getAllQuestionariesFailed(error));
  }
}

type getQuestionaryByIdAction = {
  type: typeof QuestionariesTypes.GET_QUESTIONARY_BY_ID_REQUESTED;
  id: string;
};
function* getQuestionaryByIdSaga({ id }: getQuestionaryByIdAction) {
  try {
    const snapshot: Questionary = (yield firestore
      .collection(questionariesCollection)
      .doc(id)
      .get()).data();

    snapshot.sections = [];
    (yield firestore
      .collection(sectionsCollection)
      .where("questionary", "==", id)
      .orderBy("priority")
      .get()).forEach((doc: any) =>
      snapshot.sections?.push({ ...doc.data(), id: doc.id, subsections: [] })
    );

    (yield firestore
      .collection(subsectionsCollection)
      .where("questionary", "==", id)
      .orderBy("priority")
      .get()).forEach((doc: any) =>
      snapshot.sections
        ?.find((section) => section.id === doc.data().section)
        ?.subsections?.push({ ...doc.data(), id: doc.id, questions: [] })
    );

    (yield firestore
      .collection(questionsCollection)
      .where("questionary", "==", id)
      .orderBy("priority")
      .get()).forEach((doc: any) =>
      snapshot.sections?.forEach((section) =>
        section.subsections
          ?.find((subsection) => subsection.id === doc.data().subsection)
          ?.questions?.push({ ...doc.data(), id: doc.id })
      )
    );

    yield put(QuestionariesActions.getQuestionaryByIdSucceeded(snapshot));
  } catch (error) {
    yield put(QuestionariesActions.getQuestionaryByIdFailed(error));
  }
}

type replyQuestionaryAction = {
  type: typeof QuestionariesTypes.REPLY_QUESTIONARY_REQUESTED;
  id: string;
  replies: any;
};
function* replyQuestionarySaga({ id, replies }: replyQuestionaryAction) {
  try {
    const data = { replies, user: auth.currentUser?.uid, questionary: id };

    const oldResponseId: any = [];

    (yield firestore
      .collection(questionariesResponsesCollections)
      .where("questionary", "==", id)
      .where("user", "==", auth.currentUser?.uid)
      .limit(1)
      .get()).forEach((v: any) => oldResponseId.push(v.id));

    if (oldResponseId[0]) {
      yield firestore
        .collection(questionariesResponsesCollections)
        .doc(oldResponseId[0])
        .set(data);
    } else {
      yield firestore.collection(questionariesResponsesCollections).add(data);
    }
    yield put(QuestionariesActions.getQuestionaryResponsesRequested(id));
  } catch (error) {
    yield put(QuestionariesActions.replyQuestionaryFailed(error));
  }
}

type getQuestionaryResponsesAction = {
  type: typeof QuestionariesTypes.GET_QUESTIONARY_RESPONSES_REQUESTED;
  id: string;
};
function* getQuestionaryResponsesSaga({ id }: getQuestionaryResponsesAction) {
  try {
    const snapshot: any = [];

    (yield firestore
      .collection(questionariesResponsesCollections)
      .where("questionary", "==", id)
      .where("user", "==", auth.currentUser?.uid)
      .limit(1)
      .get()).forEach((v: any) => snapshot.push(v.data()));

    yield put(
      QuestionariesActions.getQuestionaryResponsesSucceeded(
        snapshot[0]?.replies
      )
    );
  } catch (error) {
    yield put(QuestionariesActions.getQuestionaryResponsesFailed(error));
  }
}

export default function* questionariesSaga() {
  yield all([
    takeLatest(
      QuestionariesTypes.GET_ALL_QUESTIONARIES_REQUESTED,
      getAllQuestionariesSaga
    ),
    takeLatest(
      QuestionariesTypes.GET_QUESTIONARY_BY_ID_REQUESTED,
      getQuestionaryByIdSaga
    ),
    takeLatest(
      QuestionariesTypes.REPLY_QUESTIONARY_REQUESTED,
      replyQuestionarySaga
    ),
    takeLatest(
      QuestionariesTypes.GET_QUESTIONARY_RESPONSES_REQUESTED,
      getQuestionaryResponsesSaga
    ),
  ]);
}
