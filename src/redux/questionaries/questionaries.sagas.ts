import { all, put, takeLatest } from "redux-saga/effects";
import {
  questionariesCollection,
  questionsCollection,
  sectionsCollection,
  subsectionsCollection,
} from "../../constants/database-collections";
import Questionary from "../../entities/Questionary";
import Section from "../../entities/Section";
import Subsection from "../../entities/Subsection";
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
    yield put(QuestionariesActions.getAllQuestionariesFailed(error));
  }
}

type getQuestionaryByIdAction = {
  type: typeof QuestionariesTypes.GET_QUESTIONARY_BY_ID_REQUESTED;
  id: string;
};
function* getQuestionaryById({ id }: getQuestionaryByIdAction) {
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
    console.log(error);
    yield put(QuestionariesActions.getQuestionaryByIdFailed(error));
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
      getQuestionaryById
    ),
  ]);
}
