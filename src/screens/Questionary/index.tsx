import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IGlobalState from "../../redux/definitions/GlobalState";
import { QuestionariesActions } from "../../redux/questionaries/questionaries.ducks";

interface IQuestionaryParams {
  questionaryId: string;
}

const Questionary: React.FC = () => {
  const dispatch = useDispatch();
  const { questionaryId } = useParams<IQuestionaryParams>();
  const { respondingQuestionary, loading } = useSelector(
    (state: IGlobalState) => state.questionariesReducer
  );

  useEffect(() => {
    dispatch(QuestionariesActions.getQuestionaryByIdRequested(questionaryId));
  }, [dispatch, questionaryId]);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return <h1>{JSON.stringify(respondingQuestionary, null, 4)}</h1>;
};

export default Questionary;
